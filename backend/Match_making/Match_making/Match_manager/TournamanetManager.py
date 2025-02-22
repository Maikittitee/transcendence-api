from typing import Dict, List
import shortuuid
import json
from .GameInstant import GameSettings
from .GameInstantManeger import GameManager

class TournamentManager:
	def __init__(self):
		self.tournaments = {}
		self.waiting_players = []
		self.game_manager = GameManager()  # Use existing GameManager
		self.player_to_tournament = {}
	async def give_game_setting(self, player_id):
		self.game_manager.give_game_setting(player_id, "tournament")
	 
	async def add_player(self, player_id: str, connection) -> str:
		# Add player to waiting list
		player_data = {
			'id': player_id,
			'connection': connection
		}
		# self.game_manager.add_player(player_id, connection)
		self.waiting_players.append(player_data)
		print(f"Added player {player_id} to tournament queue. Total waiting: {len(self.waiting_players)}")

		# Start tournament if we have enough players
		if len(self.waiting_players) >= 2:
			self.game_manager.add_player(self.waiting_players[0]['id'], connection)
			self.game_manager.add_player(self.waiting_players[1]['id'], connection)
			tournament_id = await self.create_tournament(self.waiting_players[:2])
			self.waiting_players = self.waiting_players[2:]  # Remove players who joined tournament
			return tournament_id
		return None

	async def create_tournament(self, players: List[dict]) -> str:
		tournament_id = shortuuid.uuid()
		
		# Set up tournament structure
		self.tournaments[tournament_id] = {
			'id': tournament_id,
			'players': players,
			'matches': {
				'semifinals': [
					{'players': [players[0], players[1]], 'game_id': None, 'winner': None},
					# {'players': [players[2], players[3]], 'game_id': None, 'winner': None}
				],
				'final': {'players': [], 'game_id': None, 'winner': None}
			},
			'status': 'semifinals'
		}
		print("tournament: ", self.tournaments[tournament_id])
		# Start first round matches
		await self.start_semifinal_matches(tournament_id)
		return tournament_id

	async def start_semifinal_matches(self, tournament_id: str):
		tournament = self.tournaments[tournament_id]
		
		# Create games for semifinals
		for match in tournament['matches']['semifinals']:
			player1 = match['players'][0]
			player2 = match['players'][1]
			
			# Create game using GameManager
			game_id = await self.game_manager.create_game(player1['id'], player2['id'])
			await self.game_manager.give_game_setting(player1['id'])
			await self.game_manager.give_game_setting(player2['id'])
			match['game_id'] = game_id

			# Send match start message to both players
			for player in match['players']:
				await player['connection'].send(json.dumps({
					'type': 'tournament_match_start',
					'game_id': game_id,
					'round': 'semifinals',
					'tournament_id': tournament_id
				}))

	async def handle_game_input(self, tournament_id: str, game_id: str, player_id: str, inputs: dict):
		# Forward input to game manager
		await self.game_manager.handle_input(game_id, player_id, inputs)

	async def handle_match_end(self, tournament_id: str, game_id: str, winner_id: str):
		tournament = self.tournaments.get(tournament_id)
		if not tournament:
			return

		if tournament['status'] == 'semifinals':
			# Update semifinals results
			for match in tournament['matches']['semifinals']:
				if match['game_id'] == game_id:
					match['winner'] = winner_id

			# Check if both semifinals are complete
			winners = [match['winner'] for match in tournament['matches']['semifinals'] 
					  if match['winner'] is not None]
			
			if len(winners) == 2:
				# Start final match
				tournament['status'] = 'final'
				tournament['matches']['final']['players'] = winners
				await self.start_final_match(tournament_id)

		elif tournament['status'] == 'final':
			# Tournament complete
			tournament['matches']['final']['winner'] = winner_id
			await self.end_tournament(tournament_id)

	async def start_final_match(self, tournament_id: str):
		tournament = self.tournaments[tournament_id]
		final = tournament['matches']['final']
		
		# Create final game
		game_id = await self.game_manager.create_game(
			final['players'][0],
			final['players'][1]
		)
		final['game_id'] = game_id

		# Notify finalists
		for player_id in final['players']:
			player_connection = self.get_player_connection(tournament_id, player_id)
			if player_connection:
				await player_connection.send(json.dumps({
					'type': 'tournament_final_start',
					'game_id': game_id,
					'tournament_id': tournament_id
				}))

	async def end_tournament(self, tournament_id: str):
		tournament = self.tournaments[tournament_id]
		winner_id = tournament['matches']['final']['winner']
		
		# Notify all tournament players
		for player in tournament['players']:
			try:
				await player['connection'].send(json.dumps({
					'type': 'tournament_end',
					'winner_id': winner_id,
					'tournament_id': tournament_id
				}))
			except:
				pass

	def get_player_connection(self, tournament_id: str, player_id: str):
		tournament = self.tournaments.get(tournament_id)
		if tournament:
			for player in tournament['players']:
				if player['id'] == player_id:
					return player['connection']
		return None
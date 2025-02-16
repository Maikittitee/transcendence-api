from typing import Dict, Optional, List
import shortuuid
import asyncio
import json
from .GameInstant import GameInstant, GameSettings
from .utils import ApiManager
from datetime import datetime
import sys

class GameManager:
	def __init__(self):
		self.games: Dict[str, GameInstant] = {}
		self.waiting_players: List[str] = []
		self.player_to_game: Dict[str, str] = {}
		self.connections: Dict[str, object] = {}
		self.game_tasks: Dict[str, asyncio.Task] = {}

	async def give_game_setting(self, player_id) -> None :
		print(f"give_game_setting to {player_id}")
		await self.connections[player_id].send(json.dumps({
			"type" : "game_setting",
			"setting" : {
				"baseWidth" : GameSettings.baseWidth,
				"baseHeight" : GameSettings.baseHeight,
				"ballRadius" : GameSettings.ballRadius,
				"paddleRadius" : GameSettings.paddleRadius,
				"frameRate" : GameSettings.frameRate,
				"paddlePos" : {
					"x" : GameSettings.paddleInitPositionX,
					"y" : GameSettings.paddleInitPositionY
				},
			}}))
	
	async def add_player(self, player_id: str, websocket) -> Optional[str]:
		self.connections[player_id] = websocket
		if player_id in self.player_to_game:
			game_id = self.player_to_game[player_id]
			return game_id
	
		self.waiting_players.append(player_id)
		
		if len(self.waiting_players) >= 2:
			player1_id = self.waiting_players.pop(0)
			player2_id = self.waiting_players.pop(0)
			return await self.create_game(player1_id, player2_id)  
		return None

	async def create_game(self, player1_id: str, player2_id: str) -> str:
		try:
			game_id = shortuuid.uuid()  # Fixed shortuuid call
			self.games[game_id] = GameInstant(player1_id, player2_id, game_id)
			self.player_to_game[player1_id] = game_id
			self.player_to_game[player2_id] = game_id
			
			state = {
				'type': 'game_start',
				'game_id': game_id,
				'player1': player1_id,
				'player2': player2_id,
				# 'setting' : self.games[game_id].settings
			}
			await self.broadcast_state(game_id, state)

			self.games[game_id].status = 'playing'
			self.game_tasks[game_id] = asyncio.create_task(self.game_loop(game_id))
			return game_id
		except asyncio.CancelledError:
			print(f"Game loop {game_id} was cancelled.")
		except Exception as e:
			print(f"Error creating game: {e}")
			raise

	async def broadcast_state(self, game_id: str, state: dict):
	
		players = self.get_players_by_game_id(game_id)
		for player_id in players:
			if player_id in self.connections:
				try:
					# print(f"Sending to player {player_id}: {state}")
					await self.connections[player_id].send(
						json.dumps(state)
					)
				except Exception as e:
					print(f"Error sending to player {player_id}: {e}")

	async def game_loop(self, game_id: str):
		try:
			game = self.games[game_id]
			while game_id in self.games and (game.status == "playing" or game.status == "finished"):
				game.update({},{})
				if ( game.status != "finished"):
					# print(f"hello1: {game.status}")
					state_data = {
						'type': "game_state",
						'state': game.get_state()
					}
					await self.broadcast_state(game_id, state_data)
				else :
					try:
						final_message = {
							'type': 'game_over',
							'winner': game.winner,
							'final_score': {
								'player1': game.left_paddle.score,
								'player2': game.right_paddle.score
							},
							'game_id': game_id
						}
						print(f"game {game_id} is finish")
						sys.stdout.flush()
							
						try:
							players = self.get_players_by_game_id(game_id)
							request_body = {
								"player1_score": game.left_paddle.score ,
								"player2_score": game.right_paddle.score,
								"status": "COMPLETED",
								"started_at": str(datetime.today()),
								"completed_at": str(datetime.now()),
								"max_score": max( game.left_paddle.score, game.right_paddle.score),
								"game_duration": 5,
								"player1": players[0],
								"player2": players[1],
								"winner": game.winner  
							}
							print("About to print request body")
							sys.stdout.flush()
							print("this is request body: ", request_body)
							sys.stdout.flush()
						except Exception as e:
							print(f"Error creating request body: {e}")
							sys.stdout.flush()

						try:
							print("About to broadcast final state")
							sys.stdout.flush()
							await self.broadcast_state(game_id, final_message)
							print("Broadcast complete")
							sys.stdout.flush()
						except Exception as e:
							print(f"Error broadcasting final state: {e}")
							sys.stdout.flush()
						try:
							print("POST match request")
							print(await ApiManager.post("https://nginx/api/matches/match/", data=request_body))
						except Exception as e:
							print(f"Error posting data: {e}")
					except Exception as e:
						print(f"Error in game finish block: {e}")
						sys.stdout.flush()
					break
				await asyncio.sleep(1/60)
	
		except Exception as e:
			print(f"Error in game {game_id}: {e}")
			try:
				await self.cleanup_game(game_id)
			except Exception as e:
				print(f"Failed to cleanup game {game_id}: {e}")
	
		finally :
			print("bp1")
			print(f"game {game_id}")
			print("bp2")
			try:
				await self.cleanup_game(game_id)
			except Exception as e:
				print(f"Failed to cleanup game {game_id}: {e}")
		


	async def handle_input(self, game_id: str, player_id: str, input_data: dict):
		# if not isinstance(input_data, dict) :
		#     return
		# print(f"handle_input {game_id} {player_id} {input_data}")
	
		if game_id in self.games:
			game = self.games[game_id]
			players = self.get_players_by_game_id(game_id)
			# print(f"players {players}")
			# print(f"player_id {player_id}")
			is_player1 = (players[0] == player_id)
			# print(f"is_player1 {is_player1}")
			if is_player1:
				# print(f"player1 {input_data}")
				game.update(input_data, {})
			else:
				game.update({}, input_data)

	async def cleanup_game(self, game_id: str):
		try:
			# remove game from ruinng games 
			if game_id in self.games:
				print(f"Game Data: {self.games[game_id]}")
				if game_id in self.game_tasks:
					self.game_tasks[game_id].cancel()
					del self.game_tasks[game_id]
				
				del self.games[game_id]
				
				
				# remove players 
				players_to_remove = self.get_players_by_game_id(game_id) 
				for player_id in players_to_remove:
					del self.player_to_game[player_id]
					if player_id in self.connections:
						del self.connections[player_id]
				
				print(f"Cleaned up game {game_id}")
				
		except Exception as e:
			print(f"Error in cleanup: {e}")

	def get_players_by_game_id(self, game_id):
		return [pid for pid, gid in self.player_to_game.items() if gid == game_id]

	async def handle_disconnect(self, player_id: str):
		"""Handle player disconnection"""
		game_id = self.player_to_game.get(player_id)
		if game_id:
			# Notify other player
			players = self.get_players_by_game_id(game_id)
			
			for other_player in players:
				if other_player in self.connections:
					try:
						await self.connections[other_player].send(json.dumps({
							'type': 'player_disconnected',
							'player_id': player_id
						}))
					except:
						pass
			await self.cleanup_game(game_id)
		if player_id in self.waiting_players:
			self.waiting_players.remove(player_id)
		if player_id in self.connections:
			del self.connections[player_id]

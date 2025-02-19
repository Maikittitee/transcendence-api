from channels.generic.websocket import AsyncWebsocketConsumer
from .models import *
import json
from .GameInstantManeger import GameManager
from .TournamanetManager import TournamentManager
import shortuuid
from .utils import ApiManager

class PongConsumer(AsyncWebsocketConsumer):
	game_manager = GameManager()  # Single game manager instance
	tournament_manager = TournamentManager()
	
	async def connect(self):
		query = dict(x.split('=') for x in self.scope['query_string'].decode('utf-8').split('&'))
		token = query.get('token')
		self.mode = query.get('mode', 'normal')  # Default to normal mode
		user_data = ApiManager.get('https://nginx/api/auth/users/me/', authorize=token)
		
		print(user_data)
		self.player_id = user_data.get('id', '0')
		print(f"Player {self.player_id} connected")
		self.game_id = ""
		self.tournament_id = None
		await self.accept()
		await self.send(json.dumps(
			{
				"type":"connected",
				"playerID": self.player_id,
				"mode": self.mode
			}
		))


	async def disconnect(self, close_code):
		await self.game_manager.handle_disconnect(self.player_id)
	
	async def receive(self, text_data):
		try:
			data = json.loads(text_data)

			# print(f"Received\n{data}from \n{self.player_id} on {self.game_id}")
			if (self.mode == "normal"): 
				if self.game_id and data['type'] == 'player_input':	
					if self.game_id == "":
						self.game_id = data['game_id']
						print(f"set Game ID {self.game_id}")
					await self.game_manager.handle_input(self.game_id, self.player_id, data.get('inputs', {}))
				if data['type'] == 'game_start' :
					self.game_id = data['game_id']
					print(f"Game Start {self.game_id}")
				if data['type'] == 'connected':
					print("Connected")
					await self.game_manager.give_game_setting(self.player_id)
				if data['type'] == 'queue':
					print(f"Player {self.player_id} joined game {self.game_id}")
					self.game_id = await self.game_manager.add_player(self.player_id, self)
			else: # Tournament mode
				if data['type'] == 'queue':
					# Join tournament queue
					self.tournament_id = await self.tournament_manager.add_player(self.player_id, self)
					if not self.tournament_id:
						await self.send(json.dumps({
							"type": "tournament_waiting",
							"message": "Waiting for more players..."
						}))
				
				elif data['type'] == 'player_input' and self.game_id:
					# Handle game input in tournament match
					await self.tournament_manager.handle_game_input(
						self.tournament_id,
						self.game_id,
						self.player_id,
						data.get('inputs', {})
					)
				
				elif data['type'] == 'match_end':
					# Handle tournament match completion
					await self.tournament_manager.handle_match_end(
						self.tournament_id,
						self.game_id,
						data['winner_id']
					)

	
	
		except json.JSONDecodeError:
			pass


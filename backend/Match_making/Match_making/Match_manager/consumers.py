from channels.generic.websocket import AsyncWebsocketConsumer
from .models import *
import json
from .GameInstantManeger import GameManager
import shortuuid
from .utils import ApiManager

class PongConsumer(AsyncWebsocketConsumer):
	game_manager = GameManager()  # Single game manager instance
	
	async def connect(self):
		token = self.scope['query_string'].decode('utf-8').split('=')[1]
		user_data = ApiManager.get('https://nginx/api/auth/users/me/', authorize=token)
		
		### NOTEEEEEEEEEEEEEEEEEEEEEEe
		print(user_data)
		self.player_id = user_data.get('id')
		# self.player_id = "99"
		print(f"Player {self.player_id} connected")
		self.game_id = ""  # Generate player ID
		await self.accept()
		await self.send(json.dumps(
			{
				"type":"connected",
				"playerID": self.player_id
			}
		))


	async def disconnect(self, close_code):
		await self.game_manager.handle_disconnect(self.player_id)
	
	async def receive(self, text_data):
		try:
			data = json.loads(text_data)

			# print(f"Received\n{data}from \n{self.player_id} on {self.game_id}")
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
		except json.JSONDecodeError:
			pass


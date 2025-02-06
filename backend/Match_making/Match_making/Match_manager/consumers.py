from channels.generic.websocket import AsyncWebsocketConsumer
from .models import *
import json
from .GameInstantManeger import GameManager
import shortuuid
from .utils import ApiManager

class PongConsumer(AsyncWebsocketConsumer):
	game_manager = GameManager()  # Single game manager instance
	
	async def connect(self):
		
		print("yed mae this is first connect")
		token = self.scope['query_string'].decode('utf-8').split('=')[1]
		print(f"token: {token}")
		user_data = ApiManager.get('http://127.0.0.1:9000/auth/users/me/', authorize=token)
		
		### NOTEEEEEEEEEEEEEEEEEEEEEEe
		self.player_id = user_data['id']
		
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

			#print(f"Received\n{data}from \n{self.player_id} on {self.game_id}")
			if self.game_id and data['type'] == 'player_input':
				if self.game_id == "":
					self.game_id = data['game_id']
					print(f"set Game ID {self.game_id}")
				await self.game_manager.handle_input(
					self.game_id,
					self.player_id,
					data.get('inputs', {})
				)
			if data['type'] == 'game_start' :

				self.game_id = data['game_id']
				print(f"Game Start {self.game_id}")
			if data['type'] == 'connected':
				await self.game_manager.give_game_setting(self.player_id)
			
			if data['type'] == 'queue':
				self.game_id = await self.game_manager.add_player(self.player_id, self)
				print(f"Player {self.player_id} joined game {self.game_id}")
		except json.JSONDecodeError:
			pass

# class MatchmakingConsumer(AsyncJsonWebsocketConsumer):
#     queue_player = []

#     async def connect(self):
#         query_string = self.scope['query_string'].decode()
#         query_params = parse_qs(query_string)
#         user = query_params.get('user', [None])[0]
#         user_id = query_params.get('user_id', [None])[0]
#         user_channel_name = self.channel_name

#         if user is None or user_id is None:
#             await self.send(text_data=json.dumps({
#                 'type': 'error_message',
#                 'message': 'refuse to join user is Unauthorized the user or id is not provided'
#             }))
#             await self.close()
#             return

#         self.Session = await self.create_player_session(user, user_id, user_channel_name)
#         await self.accept()
#         print("MatchmakingConsumer Connected")
#         await self.send(
#             text_data=json.dumps({
#                 'type': 'connected',
#                 'message': 'Connected to Matchmaking',
#                 'user': user,
#                 'user_id': user_id,
#                 'channel_name': user_channel_name
#             })
#         )

#     @database_sync_to_async
#     def create_player_session(self, user, user_id, user_channel_name):
#         session = PlayerSession.objects.create(
#             user_name=user,
#             user_id=user_id,
#             online_status=True,
#             current_status='idle',
#             curent_queue=None,
#             channels_name=user_channel_name
#         )
#         return session

#     async def disconnect(self, close_code):
#         self.Session.online_status = False
#         #self.queue_player.remove(self.Session)
#         print("MatchmakingConsumer Disconnected")

#     # async def receive(self, text_data=None):
#     #     print("TournamentConsumer Received", text_data)   
#     #     await self.send(text_data)

#     async def receive_json(self, content):
#         """Handle incoming WebSocket messages"""
#         action = content.get('action')
#         type = content.get('type')
#         if type == 'join_queue':
#             await self.handle_queue_join(content)
#         if type == 'queue_ready':
#             await self.send_handle_queue_ready(content)
#         # elif action == 'leave_queue':
#         #     await self.handle_queue_leave()
#         # elif action == 'game_action':
#         #     await self.handle_game_action(content)
#     async def queue_ready(self, content):
#         await self.send_json(content)
		

#     async def handle_queue_join(self, content):
#         print("MatchmakingConsumer Received", content)
#         self.queue_player.append(self.Session)
#         print(self.queue_player)
#         if len(self.queue_player) >= 2:
#             channel_layer = self.channel_layer
#             room_id = shortuuid.uuid()
#             player1 = self.queue_player.pop()
#             player2 = self.queue_player.pop()
#             await channel_layer.group_add(
#                 room_id,
#                 player1.channels_name
#             )
#             await channel_layer.group_add(
#                 room_id,
#                 player2.channels_name
#             )
#             player1.current_status = 'waiting'
#             player2.current_status = 'waiting'
#             content = json.dumps({
#                 'room_id': room_id,
#                 'player_1': player1.user_name,
#                 'player_2': player2.user_name
#             })
#             await channel_layer.group_send(
#                 room_id,
#                 {
#                     'type': 'queue_ready',
#                     'message': content
#                 }
#             )
#         else:
#             self.Session.current_status = 'queue'
#             await self.send_json({
#                 'type': 'queue_joined',
#                 'message': 'You have joined the queue'
#             })
	
#     # async def receive_json(self, content):
#     #     print("MatchmakingConsumer Received", content)
#     #     await await self.send_json(content)

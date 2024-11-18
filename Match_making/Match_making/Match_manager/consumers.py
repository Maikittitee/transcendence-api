from channels.generic.websocket import AsyncJsonWebsocketConsumer

class MatchmakingConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()
        print("MatchmakingConsumer Connected")
        await self.send("MatchmakingConsumer Connected")

    async def disconnect(self, close_code):
        print("MatchmakingConsumer Disconnected")
    async def receive(self, text_data=None):
        print("TournamentConsumer Received", text_data)   
        await self.send(text_data); 
    # async def receive_json(self, content):
    #     print("MatchmakingConsumer Received", content)
    #     await await self.send_json(content)

class TournamentConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()
        print("TournamentConsumer Connected")
        await self.send("TournamentConsumer Connected")

    async def disconnect(self, close_code):
        print("TournamentConsumer Disconnected")

    async def receive(self, text_data=None):
        print("TournamentConsumer Received", text_data)  
        await self.send(text_data); 
    # async def receive_json(self,  content):
    #     print("TournamentConsumer Received", content)
    #     await await self.send_json(content)
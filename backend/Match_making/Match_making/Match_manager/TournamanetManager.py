from .GameInstantManeger import GameManager

class TournamentManager:
    def __init__(self):
        self.tournaments = {}
        self.waiting_players = []
        self.game_manager = GameManager()  # Use existing GameManager for matches

    async def add_player(self, player_id, connection):
        self.waiting_players.append({
            'id': player_id,
            'connection': connection
        })

        if len(self.waiting_players) >= 4:
            # Create tournament with 4 players
            tournament = self.create_tournament(self.waiting_players[:4])
            self.waiting_players = self.waiting_players[4:]
            
            # Start first round matches
            await self.start_round_matches(tournament['id'])
            return tournament['id']
        return None

    def create_tournament(self, players):
        tournament_id = shortuuid.uuid()
        self.tournaments[tournament_id] = {
            'id': tournament_id,
            'players': players,
            'matches': {
                'semifinals': [
                    {'players': [players[0], players[1]], 'winner': None, 'game_id': None},
                    {'players': [players[2], players[3]], 'winner': None, 'game_id': None}
                ],
                'final': {'players': [], 'winner': None, 'game_id': None}
            },
            'status': 'semifinals'
        }
        return self.tournaments[tournament_id]

    async def start_round_matches(self, tournament_id):
        tournament = self.tournaments[tournament_id]
        
        if tournament['status'] == 'semifinals':
            for match in tournament['matches']['semifinals']:
                game_id = await self.game_manager.create_game(
                    match['players'][0]['id'],
                    match['players'][1]['id']
                )
                match['game_id'] = game_id

                # Notify players
                for player in match['players']:
                    await player['connection'].send(json.dumps({
                        'type': 'tournament_match_start',
                        'game_id': game_id,
                        'round': 'semifinals'
                    }))

    async def handle_match_end(self, tournament_id, game_id, winner_id):
        tournament = self.tournaments[tournament_id]
        
        if tournament['status'] == 'semifinals':
            # Update semifinals results
            for match in tournament['matches']['semifinals']:
                if match['game_id'] == game_id:
                    match['winner'] = winner_id
            
            # Check if semifinals complete
            winners = [m['winner'] for m in tournament['matches']['semifinals'] if m['winner']]
            if len(winners) == 2:
                tournament['status'] = 'final'
                tournament['matches']['final']['players'] = winners
                await self.start_final_match(tournament_id)

        elif tournament['status'] == 'final':
            # Tournament complete
            tournament['matches']['final']['winner'] = winner_id
            await self.end_tournament(tournament_id)

    async def handle_game_input(self, tournament_id, game_id, player_id, inputs):
        # Use existing GameManager for game mechanics
        await self.game_manager.handle_input(game_id, player_id, inputs)
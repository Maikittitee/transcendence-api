import shortuuid

class TournamentManager:
    def __init__(self):
        self.tournaments = {}  # Store active tournaments
        self.waiting_players = []  # Players waiting to join

    def add_player(self, player_id, connection):
        self.waiting_players.append({
            'id': player_id,
            'connection': connection
        })
        
        # Start tournament when 4 players are ready
        if len(self.waiting_players) >= 4:
            tournament_id = self.create_tournament(self.waiting_players[:4])
            self.waiting_players = self.waiting_players[4:]
            return tournament_id
        return None

    def create_tournament(self, players):
        tournament_id = str(shortuuid.uuid())
        self.tournaments[tournament_id] = {
            'players': players,
            'round1': {
                'match1': {
                    'players': [players[0], players[1]],
                    'winner': None,
                    'status': 'pending'
                },
                'match2': {
                    'players': [players[2], players[3]],
                    'winner': None,
                    'status': 'pending'
                }
            },
            'final': {
                'players': [],
                'winner': None,
                'status': 'waiting'
            },
            'status': 'round1'
        }
        return tournament_id
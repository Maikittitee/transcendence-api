
```mermaid
stateDiagram-v2
    [*] --> Waiting: Player Joins
    
    Waiting --> Matchmaking: Join Queue
    Matchmaking --> InGame: Match Found
    
    Waiting --> TournamentWaiting: Join Tournament
    TournamentWaiting --> TournamentInProgress: Min Players Reached
    TournamentInProgress --> InGame: Round Start
    
    InGame --> GameEnd: Game Complete
    GameEnd --> Waiting: New Game
    
    InGame --> Disconnected: Connection Lost
    Disconnected --> InGame: Reconnect
    
    GameEnd --> [*]: Leave Game

```

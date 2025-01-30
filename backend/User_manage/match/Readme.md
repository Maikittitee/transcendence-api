# Create
### create matches
    POST /matches/match/
input data

    {
        "player1_score": 0,
        "player2_score": 0,
        "status": "PENDING",
        "started_at": null,
        "completed_at": null,
        "max_score": 10,
        "game_duration": null,
        "player1": 1,
        "player2": 3,
        "winner": 1
    }

จะได้ response แบบนี้

    {
        "id": 25,
        "player1_score": 0,
        "player2_score": 0,
        "status": "PENDING",
        "created_at": "2025-01-30T17:21:09.151997Z",
        "started_at": null,
        "completed_at": null,
        "max_score": 10,
        "game_duration": null,
        "player1": 1,
        "player2": 3,
        "winner": 1
    }

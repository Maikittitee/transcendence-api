# Create
- #### create match
```
    POST /matches/match/
```
input data
```
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
```
จะได้ response แบบนี้
```
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
```

# Read <span style="color:red"> (need authorize) </span>
- #### Read all list of matches
```
GET /matches/match/
```

จะได้ response แบบนี้
```
[
    {
        "id": 2,
        "player1_score": 0,
        "player2_score": 0,
        "status": "PENDING",
        "created_at": "2025-01-30T17:25:02.626507Z",
        "started_at": null,
        "completed_at": null,
        "max_score": 10,
        "game_duration": null,
        "player1": 1,
        "player2": 3,
        "winner": 1
    },
    {
        "id": 1,
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
]
```

- #### Read specific id

```
GET /matches/match/{id} - > /matches/match/2/
```

จะได้ response แบบนี้
```

    {
        "id": 2,
        "player1_score": 0,
        "player2_score": 0,
        "status": "PENDING",
        "created_at": "2025-01-30T17:25:02.626507Z",
        "started_at": null,
        "completed_at": null,
        "max_score": 10,
        "game_duration": null,
        "player1": 1,
        "player2": 3,
        "winner": 1
    }
```

- #### Read specific id of user

```
GET /matches/match-history/
```

จะได้ response แบบนี้
```
[
    {
        "id": 26,
        "player1_score": 0,
        "player2_score": 0,
        "status": "PENDING",
        "created_at": "2025-01-30T17:25:02.626507Z",
        "started_at": null,
        "completed_at": null,
        "max_score": 10,
        "game_duration": null,
        "player1": 1,
        "player2": 3,
        "winner": 1
    },
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
    },
    {
        "id": 24,
        "player1_score": 0,
        "player2_score": 0,
        "status": "PENDING",
        "created_at": "2025-01-30T17:19:03.335932Z",
        "started_at": null,
        "completed_at": null,
        "max_score": 10,
        "game_duration": null,
        "player1": 1,
        "player2": 3,
        "winner": 1
    }
]
```

# Update <span style="color:red"> (need authorize) </span>
- #### update specific data
```
    PATCH /matches/match/{id}/ -> /matches/match/2/
```
 - input data if you want to change **player1_score**
```
    {
        "player1_score": 0
    }
```
จะได้ response แบบนี้
```
{
    "id": 2,
    "player1_score": 0,
    "player2_score": 1,
    "status": "PENDING",
    "created_at": "2025-01-22T10:12:23.639727Z",
    "started_at": "2025-01-22T16:53:00Z",
    "completed_at": null,
    "max_score": 10,
    "game_duration": null,
    "player1": 1,
    "player2": 2,
    "winner": 2
}
```
 - input data if you want to change **player2_score**
```
    {
        "player2_score": 10
    }
```
จะได้ response แบบนี้
```
{
    "id": 2,
    "player1_score": 0,
    "player2_score": 10,
    "status": "PENDING",
    "created_at": "2025-01-22T10:12:23.639727Z",
    "started_at": "2025-01-22T16:53:00Z",
    "completed_at": null,
    "max_score": 10,
    "game_duration": null,
    "player1": 1,
    "player2": 2,
    "winner": 2
}
```
 - input data if you want to change **player1_score and player2_score**
```
    {
        "player1_score": 10,
        "player2_score": 10
    }
```
จะได้ response แบบนี้
```
{
    "id": 2,
    "player1_score": 10,
    "player2_score": 10,
    "status": "PENDING",
    "created_at": "2025-01-22T10:12:23.639727Z",
    "started_at": "2025-01-22T16:53:00Z",
    "completed_at": null,
    "max_score": 10,
    "game_duration": null,
    "player1": 1,
    "player2": 2,
    "winner": 2
}
```

# Delete <span style="color:red"> (need authorize) </span>
- #### delete specific data of match
```
    DELETE /matches/match/{id}/ -> /matches/match/2/
```
จะได้ response แบบนี้
```

```


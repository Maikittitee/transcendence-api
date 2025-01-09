from dataclasses import dataclass
from typing import Dict, Optional
import math
import random
import time
import json

@dataclass
class GameSettings:
    baseWidth: int = 800
    baseHeight: int = 400
    paddleSpeed: float = 5.0
    ballSpeed: float = 2.0
    maxScore: int = 10
    frameRate: int = 60
    paddleRadius: int = 50
    ballRadius: int = 5
    speedIncrement : float = 0.2
    paddleOffset : int = 50
    timePerFrame : float = 1.0 / frameRate
    paddleInitPositionY : int = baseHeight / 2
    paddleInitPositionX : int = 50.0

class CircleObject:
    def __init__(self, x: float, y: float, radius: float):
        self.x = x
        self.y = y
        self.radius = radius
    
    def isCollideWithOtherCircle(self, other: 'CircleObject') -> bool:
        dx = self.x - other.x
        dy = self.y - other.y
        distance = math.sqrt(dx * dx + dy * dy)
        return distance < (self.radius + other.radius)


class Ball(CircleObject):
    def __init__(self, settings: GameSettings):
        super().__init__(
            x=settings.baseWidth / 2,
            y=settings.baseHeight / 2,
            radius=settings.ballRadius
        )
        self.settings = settings
        self.reset()
    
    def reset(self, direction: int = 1):
        self.x = self.settings.baseWidth / 2
        self.y = self.settings.baseHeight / 2
        self.speed = self.settings.ballSpeed
        angle = math.radians(random.randint(-30, 30))  # Random initial angle
        self.dx = math.cos(angle) * self.speed * direction
        self.dy = math.sin(angle) * self.speed

    def update(self, delta_time: float):
        self.x += self.dx * delta_time
        self.y += self.dy * delta_time

        if self.y - self.radius <= 0:
            self.y = self.radius
            self.dy = abs(self.dy)
        elif self.y + self.radius >= self.settings.baseHeight:
            self.y = self.settings.baseHeight - self.radius
            self.dy = -abs(self.dy)

    def reflexFromPaddle(self, paddle_y: float, direction: int):
        relative_intersect = (paddle_y - self.y) / self.settings.paddleRadius
        bounce_angle = relative_intersect * math.pi / 4  # 45 degree max angle
        
        self.speed += self.settings.speedIncrement
        self.dx = direction * self.speed * math.cos(bounce_angle)
        self.dy = -self.speed * math.sin(bounce_angle)

class Paddle(CircleObject):
    def __init__(self, player: str ,x: float, settings: GameSettings):
        super().__init__(
            x=x,
            y=settings.baseHeight / 2,
            radius=settings.paddleRadius
        )
        self.playerName = player
        self.settings = settings
        self.score = 0
        self.speed = settings.paddleSpeed
    
    def move(self, direction: float, delta_time: float):
        new_y = self.y + direction * (self.speed * delta_time)
        
        # Boundary checking
        if (new_y - self.radius > 0 and 
            new_y + self.radius < self.settings.baseHeight):
            self.y = new_y


class GameInstant:
    def __init__(self, player1: str, player2: str, game_id: str):
        self.game_id = game_id
        self.settings = GameSettings()
        self.ball = Ball(self.settings)
        self.left_paddle = Paddle(player1, self.settings.paddleOffset, self.settings)
        self.right_paddle = Paddle(player2 ,self.settings.baseWidth - self.settings.paddleOffset, self.settings)
        self.status = 'waiting'
        self.winner = None
        self.last_update = time.time()

    
    def update(self, p1_input: Dict[str, bool], p2_input: Dict[str, bool]) -> None:
        
        current_time = time.time()
        # delta_time = min(current_time - self.last_update, 0.1)
        delta_time = 1
        self.last_update = current_time

        if self.status != 'playing':
            return
        #is input are type??
        if isinstance(p1_input, dict) or isinstance(p2_input, dict):
            if p1_input.get('UP'):
                self.left_paddle.move(-1, delta_time)
            if p1_input.get('DOWN'):
                self.left_paddle.move(1, delta_time)
             
            if p2_input.get('UP'):
                self.right_paddle.move(-1, delta_time)
            if p2_input.get('DOWN'):
                self.right_paddle.move(1, delta_time)

        self.ball.update(delta_time)
        
        self._handle_collisions()
        self._check_scoring()
    
    def _handle_collisions(self):
        if self.ball.isCollideWithOtherCircle(self.left_paddle):
            self.ball.x = self.left_paddle.x + self.left_paddle.radius + self.ball.radius
            self.ball.reflexFromPaddle(self.left_paddle.y, 1)
        elif self.ball.isCollideWithOtherCircle(self.right_paddle):
            self.ball.x = self.right_paddle.x - self.right_paddle.radius - self.ball.radius
            self.ball.reflexFromPaddle(self.right_paddle.y, -1)

    def _check_scoring(self):

        if self.ball.x < 0:
            self.right_paddle.score += 1
            self.ball.reset(-1)
        elif self.ball.x > self.settings.baseWidth:
            self.left_paddle.score += 1
            self.ball.reset(1)

        if (self.left_paddle.score >= self.settings.maxScore or 
            self.right_paddle.score >= self.settings.maxScore):
            self.winner = (self.left_paddle.playerName 
                            if self.left_paddle.score > self.right_paddle.score 
                                 else self.right_paddle.playerName
                            )
            self.status = 'finished'

    def get_state(self) -> dict :
        return {
            'game_id': self.game_id,
            'status': self.status,
            'ball': {
                'x': self.ball.x,
                'y': self.ball.y,
                'radius': self.ball.radius
            },
            'paddles': {
                'left': {
                    'x': self.left_paddle.x,
                    'y': self.left_paddle.y,
                    'radius' : self.left_paddle.radius,
                    'score': self.left_paddle.score
                },
                'right': {
                    'x': self.right_paddle.x,
                    'y': self.right_paddle.y,
                    'radius' : self.right_paddle.radius,
                    'score': self.right_paddle.score
                }
            }
        }



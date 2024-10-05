# PORT = 9000

# all: run

# run:
# 	python3 User_manage/manage.py runserver $(PORT)

# makemigrations:
# 	python3 User_manage/manage.py makemigrations

# migrate:
# 	python3 User_manage/manage.py migrate

# Default port and host
PORT = 9000
HOST = 127.0.0.1

# Default target is to run the server
all: run

# Run the Django development server on the specified port and host
run:
	python3 User_manage/manage.py runserver $(HOST):$(PORT)

# Run migrations
migrate:
	python3 User_manage/manage.py migrate

# Make migrations
makemigrations:
	python3 User_manage/manage.py makemigrations

# Check for Django project issues
check:
	python3 User_manage/manage.py check

# Docker-specific commands to interact with the Docker container
docker-run:
	docker-compose up --build

docker-down:
	docker-compose down

docker-migrate:
	docker-compose exec user_management make migrate

docker-makemigrations:
	docker-compose exec user_management make makemigrations

docker-rebuild:
	docker-compose up --build --force-recreate

PORT = 9000

all: run

run: makemigrations migrate
	python3 User_manage/manage.py runserver $(PORT)

makemigrations:
	python3 User_manage/manage.py makemigrations

migrate:
	python3 User_manage/manage.py migrate


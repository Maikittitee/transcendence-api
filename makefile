PORT = 9000

all: makemigrations migrate run

run:
	python3 User_manage/manage.py runserver $(PORT) --noreload

makemigrations:
	python3 User_manage/manage.py makemigrations

migrate:
	python3 User_manage/manage.py migrate


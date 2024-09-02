PORT = 9000

all:
	python3 User_manage/manage.py runserver $(PORT)
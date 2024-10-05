#!/usr/bin/sh 

python3 User_manage/manage.py makemigrations --merge --no-input
python3 User_manage/manage.py migrate --no-input
python3 User_manage/manage.py runserver 0.0.0.0:8001
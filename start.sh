#!/bin/bash

# echo "hello"

python3 ./User_manage/manage.py makemigrations ; python3 ./User_manage/manage.py migrate ; python3 ./User_manage/manage.py runserver 0.0.0.0:9000 --noreload
# ft-transcendence-42



* How to run this project

## Project Setup

1. file structure
``` 
.
├── ft_transcendence.pdf
├── makefile
├── README.md
├── requirements.txt
└── User_manage
    ├── Auth
    │   ├── admin.py
    │   ├── apps.py
    │   ├── __init__.py
    │   ├── migrations
    │   │   └── __init__.py
    │   ├── models.py
    │   ├── __pycache__
    │   │   ├── __init__.cpython-310.pyc
    │   │   ├── urls.cpython-310.pyc
    │   │   └── views.cpython-310.pyc
    │   ├── tests.py
    │   ├── urls.py
    │   └── views.py
    ├── db.sqlite3
    ├── manage.py
    └── User_manage
        ├── asgi.py
        ├── __init__.py
        ├── __pycache__
        │   ├── __init__.cpython-310.pyc
        │   ├── settings.cpython-310.pyc
        │   ├── urls.cpython-310.pyc
        │   └── wsgi.cpython-310.pyc
        ├── settings.py
        ├── urls.py
        └── wsgi.py
```
2. create virtial env: ``` python3 -m venv env ```

so you will got this:
```
$>ls 
env  ft_transcendence.pdf  makefile  README.md  requirements.txt  User_manage 
```

3. activate env: ``` source env/bin/activate ``` ( run ``` deactivate	``` for deactivate env) 

4. install python module (used modules are listed in `requirements.txt`):
```
	pip3 install -r requirements.txt
```

## Run Project

1. run django server:
``` python3 User_manage/manage.py runserver 8000 ```
	
so now, you server will available at ```127.0.0.1:8000```

for example: 	```127.0.0.1:8000/Auth``` you will got: ```Hello, world. You're at the polls index.```
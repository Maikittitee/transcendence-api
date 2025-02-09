all: run

run: 
	python3 Match_making/manage.py runserver 0.0.0.0:25566

rund:
	python3 Match_making/manage.py runserver 0.0.0.0:25566 &

stop:
	pkill -f "runserver 0.0.0.0:25566" || true


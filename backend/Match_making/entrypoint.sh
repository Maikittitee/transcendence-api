#!/bin/sh

# Run migrations
python3 Match_making/manage.py migrate --noinput

# Start server
python3 Match_making/manage.py runserver 0.0.0.0:25566
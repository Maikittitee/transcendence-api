#!/bin/sh

set -e

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "db" -U "root" -d "db1" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
python3 Match_making/manage.py migrate --noinput

# Start server
python3 Match_making/manage.py runserver 0.0.0.0:25566
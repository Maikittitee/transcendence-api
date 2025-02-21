#!/bin/sh

set -e

# Use environment variables from .env
until PGPASSWORD="${DB_PASSWORD}" psql -h "db" -U "${DB_USER}" -d "${DB_NAME}" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"

python3 Match_making/manage.py migrate --noinput

# Start server
python3 Match_making/manage.py runserver 0.0.0.0:25566
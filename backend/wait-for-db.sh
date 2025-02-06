#!/bin/sh
echo "Waiting for PostgreSQL to start..."
while ! pg_isready -h $SQL_HOST -p $SQL_PORT -U $SQL_USER; do
  sleep 1
done
echo "PostgreSQL started!"

exec "$@"

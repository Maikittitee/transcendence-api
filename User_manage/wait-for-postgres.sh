#!/usr/bin/sh

# Wait for PostgreSQL to be available
until pg_isready -h "postgres_db" -U "$POSTGRES_USER" -d "$POSTGRES_DB"; do
  echo "Waiting for PostgreSQL..."
  sleep 10
done

echo "PostgreSQL is up - executing command"
exec "$@"

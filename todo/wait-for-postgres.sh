#!/bin/sh
# wait-for-postgres.sh
set -e
host="$1"
database="$2"
shift 2
cmd="$@"

echo "command is: $cmd"

until PGPASSWORD="1" psql -h "$host" -d "$database" -U "django" -c '\q';
do
        >&2 echo "Postgres is unavailable - sleeping"
        sleep 1
done
>&2 echo "Postgres is up - executing command"
exec $cmd
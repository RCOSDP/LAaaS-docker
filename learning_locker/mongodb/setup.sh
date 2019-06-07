#!/bin/sh

mongod --dbpath /var/lib/mongodb --fork --logpath /var/lib/mongodb/mongod.log
until mongo --eval "print(\"Waited for connection.\")"
do
  sleep 1
done

echo "Adding user to MongoDB..."
mongo learninglocker --eval "db.createUser({user:\"udzuki\", pwd:\"udzuki\", roles:[{role: \"readWrite\", db: \"learninglocker\"}]})"
echo "User added."
php /var/www/learninglocker/artisan migrate

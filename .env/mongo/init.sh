#!/usr/bin/env bash

books=$(</vagrant/.env/mongo/books.json)

echo "*************************"
echo "Creating Reedsy Database"
echo "*************************"

mongo << EOF
use reedsy
db.createCollection('books')
db.runCommand(
    {
        insert: "books",
        documents: $books
    }
)
db.books.count()
db.createUser({
  user: "reedsy",
  pwd: "i<3books",
  roles: [
    {role: "readWrite", db: "reedsy"}
  ]
})
exit
EOF

npm install -g mongo-express

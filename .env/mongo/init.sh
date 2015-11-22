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
exit
EOF
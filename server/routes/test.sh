#!/bin/bash
# set -x
host='localhost:4000'
auth='authorization: A eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU0MDg1MzA3fQ.8gYErmZf8WfB6qfz4OJ6EPuuIwaxDQ5vRKBccFEWD50'
json='content-type: application/json'
case $1 in
    "pvo")
        curl localhost:4000/api/vocabularies/ -H "$auth" -H "$json" -d '{"name": "ca8", "words":["ABC", "able"]}'  -X POST
    ;;
    "gvo")
        curl "$host/api/userWords?vocabulary=1&limit=1&offset=0&recongizeCount=-1&recongizeCount=1" -H "$auth"
    ;;
    "gau")
        curl "$host/api/userWords/able" -H "$auth"
    ;;
    "gwo")
        curl "$host/api/words/ability"
    ;;
esac

#!/bin/sh

git reset --hard HEAD^

echo "a" >> README.md

git add .

git commit -m "Hej"
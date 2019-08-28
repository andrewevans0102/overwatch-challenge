#!/bin/sh
# setup_local.sh

mkdir 'setup_commit'
cd 'setup_commit'

curl -H "Authorization:token $OC_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $OC_EMPTY'.env'
curl -H "Authorization:token $OC_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $OC_EMPTY'environment.ts'
curl -H "Authorization:token $OC_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $OC_EMPTY'environment.prod.ts'
curl -H "Authorization:token $OC_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $OC_EMPTY'cypress.json'

rm -rf ../frontend/src/environments/environment.ts
rm -rf ../frontend/src/environments/environment.prod.ts
rm -rf ../cypress.json
rm -rf ../functions/.env

cp environment.ts ../frontend/src/environments/environment.ts
cp environment.prod.ts ../frontend/src/environments/environment.prod.ts
cp .env ../functions/.env
cp cypress.json ../cypress.json

cd ..
rm -rf 'setup_commit'
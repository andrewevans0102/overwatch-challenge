#!/bin/sh
# setup_local.sh

mkdir 'setup_local'
cd 'setup_local'

curl -H "Authorization:token $OC_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $OC_DEPLOYED'.env'
curl -H "Authorization:token $OC_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $OC_DEPLOYED'environment.ts'
curl -H "Authorization:token $OC_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $OC_DEPLOYED'environment.prod.ts'
curl -H "Authorization:token $OC_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $OC_DEPLOYED'cypress.json'

rm -rf ../frontend/src/environments/environment.ts
rm -rf ../frontend/src/environments/environment.prod.ts
rm -rf ../cypress.json
rm -rf ../functions/.env

cp environment.ts ../frontend/src/environments/environment.ts
cp environment.prod.ts ../frontend/src/environments/environment.prod.ts
cp .env ../functions/.env
cp cypress.json ../cypress.json

cd ..
rm -rf 'setup_local'
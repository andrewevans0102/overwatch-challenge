#!/bin/sh
# pre_commit.sh

cd frontend/src/environments
rm -rf environment.ts
rm -rf environment.prod.ts
curl -H "Authorization:token $GITHUB_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $OC_ENVIRONMENT
curl -H "Authorization:token $GITHUB_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $OC_ENVIRONMENT_PROD
cd ../..
rm -rf cypress.json
curl -H "Authorization:token $GITHUB_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $OC_CYPRESS_JSON
cd ..
npm run environment-variables
#!/bin/sh
# post_commit.sh

cd frontend/src/environments
rm -rf environment.ts
rm -rf environment.prod.ts
curl -H "Authorization:token $GITHUB_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $EMPTY_FIREBASE_ENVIRONMENT
curl -H "Authorization:token $GITHUB_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $EMPTY_FIREBASE_ENVIRONMENT_PROD
cd ..
rm -rf cypress.json
curl -H "Authorization:token $GITHUB_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $EMPTY_FIREBASE_CYPRESS_JSON
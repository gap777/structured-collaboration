#!/usr/bin/env bash

#!/usr/bin/env bash

NODE_ENV=production npm run build
git add -f build
git commit -m "Adding build artifacts"
git push "https://git.heroku.com/collaboration-jam.git" "$(git rev-parse --abbrev-ref HEAD):refs/heads/master" --force
git reset HEAD^

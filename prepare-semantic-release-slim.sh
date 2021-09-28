#!/usr/bin/env bash
set -e

export nextReleaseVersion="$1"
export nextReleaseNotes="${@:2}"
export nextReleaseChangelog="$(git log $(git describe --tags --abbrev=0)..HEAD --oneline)"

if git rev-parse "${nextReleaseVersion}" >/dev/null 2>&1; then
  echo "version ${nextReleaseVersion} already released, aborting"
  exit 1
fi


echo "trying to release a new version $1 - will use current branch to create a new release:"
git branch currentrelease
git checkout currentrelease

echo "am on version $(node -pe "require('./package.json').version"), will now update version files"
npm run version:set ${nextReleaseVersion}
git add .
echo "am on version $(node -pe "require('./package.json').version")"
git status
echo "commiting changes"
git commit -m "[RELEASE] Releasing ${CI_PROJECT_NAME} version ${nextReleaseVersion}" -m "" -m "${nextReleaseChangelog}"
git checkout release
git reset --hard
git merge --strategy-option=theirs currentrelease
git branch -D currentrelease
git push

#!/usr/bin/env bash
set -e

export nextReleaseVersion="$1"
export nextReleaseNotes="${@:2}"
export nextReleaseChangelog="$(git log $(git describe --tags --abbrev=0)..HEAD --oneline)"

if git rev-parse "${nextReleaseVersion}" >/dev/null 2>&1; then
  echo "version ${nextReleaseVersion} already released, aborting"
  exit 1
fi

git branch currentrelease
git checkout currentrelease

npm run version:set ${nextReleaseVersion}
git add .
git commit -m "[TASK] Releasing ${CI_PROJECT_NAME} version ${nextReleaseVersion}" -m "" -m "${nextReleaseChangelog}"
git checkout release
git reset --hard
git merge --strategy-option=theirs currentrelease
git branch -D currentrelease
git push

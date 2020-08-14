module.exports = {
    "branches": [
        {
            "name": "release"
        }
    ],
    "tagFormat": "v${version}",
    "verifyConditions": "",
    "prepare": [
        {
            "path": "@semantic-release/exec",
            "cmd": "export nextReleaseChangelog=\"$(git log $(git describe --tags --abbrev=0)..HEAD --oneline)\" && if git rev-parse \"${nextRelease.version}\" >/dev/null 2>&1; then echo \"version ${nextRelease.version} already released, aborting\"; exit 1; fi && git branch currentRelease && git checkout currentRelease && npm run version:set ${nextRelease.version} && git add . && git commit -m \"[TASK] Releasing $(node -pe \"require('./package.json').name\") version ${nextRelease.version}\" -m \"\" -m \"${nextReleaseChangelog}\" && git checkout release && git reset --hard && git merge --strategy-option=theirs currentRelease && git branch -D currentRelease && git push"
        }
    ],
    "success": "",
    "fail": "",
    "publish": [
        [
            "@semantic-release/gitlab",
            {
                "assets": [
                    {
                        "path": ".dist/*",
                        "label": "Build result"
                    }
                ]
            }
        ]
    ],
    "analyzeCommits": {
        "preset": "typo3",
        "releaseRules": [
            {
                "tag": "TASK",
                "release": "patch"
            },
            {
                "tag": "BUGFIX",
                "release": "patch"
            },
            {
                "tag": "FEATURE",
                "release": "minor"
            },
            {
                "tag": "BREAKING",
                "release": "major"
            }
        ]
    },
    "generateNotes": {
        "preset": "typo3"
    }
}
;
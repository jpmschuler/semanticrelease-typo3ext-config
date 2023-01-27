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
            "cmd": "node_modules/semanticrelease-typo3ext-config/prepare-semantic-release-slim.sh \"${nextRelease.version}\" \"${nextRelease.notes}\""
        }
    ],
    "success": "",
    "fail": "",
    "publish": [
        [
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
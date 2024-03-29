module.exports = {
    tagFormat: "${version}",
    branches: ["master"],
    plugins: [
        ["@semantic-release/npm", { npmPublish: false }],
        "@semantic-release/github",
        [
            "semantic-release-plugin-update-version-in-files",
            {
                "files": [
                    "package.json",
                    "simple-tabs-block.php",
                    "readme.txt",
                    "src/tabs/block.json",
                    "src/tab/block.json"
                ],
                "placeholder": "0.0.0-development"
            }
        ]
    ]
};
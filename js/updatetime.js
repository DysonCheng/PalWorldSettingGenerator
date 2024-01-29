        const githubUsername = 'DysonCheng';
        const repoName = 'PalWorldSettingGenerator';
        const githubApiUrl = `https://api.github.com/repos/${githubUsername}/${repoName}`;

        function formatUpdateDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric'};
            //, hour: 'numeric', minute: 'numeric', second: 'numeric'
            return new Date(dateString).toLocaleDateString(undefined, options);
        }

        fetch(githubApiUrl)
            .then(response => response.json())
            .then(repoData => {
                const lastUpdate = repoData.updated_at;
                const lastUpdateFormatted = formatUpdateDate(lastUpdate);
                document.getElementById('updateResult').textContent = `Last Update: ${lastUpdateFormatted}`;
            })
            .catch(error => {
                console.error('Error fetching GitHub data:', error);
                document.getElementById('updateResult').textContent = 'Unable to fetch update time.';
            });

        document.addEventListener('DOMContentLoaded', function() {
            async function getGitHubVersion() {
                const repoOwner = 'DysonCheng';
                const repoName = 'PalWorldSettingGenerator';

                try {
                    // 使用 fetch 發送 GET 請求獲取最新的 GitHub release
                    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`);

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data = await response.json();

                    const version = data.tag_name;

                    const versionDisplay = document.getElementById('versionDisplay');
                    versionDisplay.innerHTML = `最新的版本號：${version}`;
                } catch (error) {
                    console.error('獲取版本號時發生錯誤：', error.message);
                }
            }

            getGitHubVersion();
        });
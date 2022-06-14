export const getAllCommits = () => {
    return fetch('https://api.github.com/repos/nitadragosandrei/code-quality-hook/commits', {
        method: 'get',
        headers: new Headers({
            'Authorization': 'token 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',
            'Accept': 'application/vnd.github.v3+json'
        })
    })
    .then(response => {
        return response.json()
    });
}

export const getCommitByShaId = (shaId) => {
    return fetch('https://api.github.com/repos/nitadragosandrei/code-quality-hook/commits/' + shaId, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'token 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',
            'Accept': 'application/vnd.github.v3+json'
        })
    })
        .then(response => {
            return response.json()
        });
}

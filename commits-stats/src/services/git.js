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
    return fetch('https://api.github.com/repos/nitadragosandrei/code-quality-hook/commits?per_page=100&sha=' + shaId, {
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

export const getAllBranches = () => {
    return fetch('https://api.github.com/repos/nitadragosandrei/code-quality-hook/branches', {
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
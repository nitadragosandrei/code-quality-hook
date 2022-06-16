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

export const getCommitByShaId = (shaId, page = false) => {
    const mainUrl = 'https://api.github.com/repos/nitadragosandrei/code-quality-hook/commits';
    const url = page === true ? mainUrl + '?per_page=100&sha=' + shaId : mainUrl + '/' + shaId;
    console.log("page", page);
    return fetch(url, {
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
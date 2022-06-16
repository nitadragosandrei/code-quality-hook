import React from "react"

const Table = (allCommits) => {
    return allCommits && allCommits.length > 0 ? (
        <div className="container">
            <h3 className="p-3 text-center">React - Display a list of commits</h3>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Sha</th>
                    <th>Author</th>
                    <th>Message</th>
                    <th>Files</th>
                </tr>
                </thead>
                <tbody>
                {allCommits && allCommits.length > 0 && allCommits.map(item =>
                    <tr key={item.sha}>
                        <td>{item.sha}</td>
                        <td>{item.commit.author.name}</td>
                        <td>{item.commit.message}</td>
                        <td>{extractFilenames(item.files)}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    ) : null;
}

const extractFilenames = (files) => {
    return files.map(file => file.filename + " ");
}

const extractRatingForFiles = (allCommits) => {
    let mapOfFileAndAverageRatings = new Map();

    allCommits.forEach( commit => {
        const rating = extractRatingForCommit(commit);

        if(!isNaN(rating) && rating !== ' ') {
            commit.files.forEach( file => {
                if(mapOfFileAndAverageRatings.has(file.filename)) {
                    let currentRatingArray = mapOfFileAndAverageRatings.get(file.filename);
                    currentRatingArray.push(rating);
                    mapOfFileAndAverageRatings.set(file.filename, currentRatingArray);
                } else {
                    let tempArray = [];
                    tempArray.push(rating);
                    mapOfFileAndAverageRatings.set(file.filename, tempArray);
                }
            })
        }
    })

    console.log(mapOfFileAndAverageRatings);
    return mapOfFileAndAverageRatings;
}

const extractRatingForCommit = (commit) => {
    const commitMessage = commit.commit.message;
    const indexOfFirstDelim = commitMessage.indexOf("|");
    return commitMessage.substring(indexOfFirstDelim + 2, indexOfFirstDelim + 3);
}

export default Table;


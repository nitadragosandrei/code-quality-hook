import React from "react"
const Files = (allCommits, onRowClick) => {
    const mapOfFilesAndRating = extractRatingForFiles(allCommits);

    console.log("mapOfFilesAndRating", mapOfFilesAndRating);

    const renderComponent = () => {
        return (
            <div className="container">
                <h3 className="p-3 text-center">React - Display a list of commits</h3>
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>FileName</th>
                        <th>Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mapOfFilesAndRating && mapOfFilesAndRating.size > 0 && Array.from( mapOfFilesAndRating ).map(([key, value]) =>
                        <tr key={key} onClick={() => {onRowClick(key, value)}}>
                            <td>{key}</td>
                            <td>{computeAverageRatingForFile(value)}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }

    return mapOfFilesAndRating && mapOfFilesAndRating.size > 0 ? (
        renderComponent()
    ) : null;
}

const extractRatingForCommit = (commit) => {
    const commitMessage = commit.commit.message;
    const indexOfFirstDelim = commitMessage.indexOf("|");
    return commitMessage.substring(indexOfFirstDelim + 2, indexOfFirstDelim + 3);
}

const computeAverageRatingForFile = (values) => {
    let sum = 0;

    values.forEach(value => sum += Number(value));

    return (sum / values.length).toFixed(2);
}

const extractRatingForFiles = (allCommits) => {
    let mapOfFileAndAverageRatings = new Map();

    allCommits && allCommits.length > 0 && allCommits.forEach( commit => {
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

export default Files;


import React from "react"
import { Chart } from "react-google-charts";

const Graph = (allCommits) => {
    const map = extractRatingForCommits(allCommits && allCommits.length > 0 && allCommits);
    const mapOfDayAndPrevRating = rebuildMap(map && map.size > 0 && map);
    console.log("mapOfDayAndPrevRating", mapOfDayAndPrevRating);

    let data = [];
    data.push(  ["Date", "Rating"] );

    const computeAverageRatingForFile = (values) => {
        let sum = 0;

        values.forEach(value => sum += Number(value));

        return (sum / values.length).toFixed(2);
    }

    mapOfDayAndPrevRating && Array.from(mapOfDayAndPrevRating).forEach( entry => {
        data.push([entry[0], Number(computeAverageRatingForFile(entry[1]))])
    })


    return allCommits && allCommits.length > 0 ? (
        <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
    ) : null;
}

const extractRatingForCommits = (allCommits) => {
    let mapOfDateAndAverageRatings = new Map();

    allCommits && allCommits.length > 0 && allCommits.forEach( commit => {
        const rating = extractRatingForCommit(commit);
        const date = extractDateForCommit(commit);

        if(!isNaN(rating) && rating !== ' ') {
            if(mapOfDateAndAverageRatings.has(date)) {
                let currentRatingArray = mapOfDateAndAverageRatings.get(date);
                currentRatingArray.push(rating);
                mapOfDateAndAverageRatings.set(date, currentRatingArray);
            } else {
                let tempArray = [];
                tempArray.push(rating);
                mapOfDateAndAverageRatings.set(date, tempArray);
            }
        }
    })

    return mapOfDateAndAverageRatings;
}

const extractRatingForCommit = (commit) => {
    const commitMessage = commit.commit.message;
    const indexOfFirstDelim = commitMessage.indexOf("|");
    return commitMessage.substring(indexOfFirstDelim + 2, indexOfFirstDelim + 3);
}

const extractDateForCommit = (commit) =>{
    const rawFormatDate = commit.commit.author.date;
    const indexOfT = rawFormatDate.indexOf("T");
    return rawFormatDate.substring(0, indexOfT);
}

const rebuildMap = (initialMap) => {
    if(initialMap) {
        let newMap = new Map();
        const reversedMap = Array.from(initialMap).slice(0).reverse();
        const firstElement = reversedMap[0];
        newMap.set(
            firstElement[0], firstElement[1]
        );

        reversedMap.forEach((entry, index) => {
            if(index !== 0) {
                const prevValue =  Array.from(newMap)[index - 1][1];
                const newValue = prevValue.concat(entry[1])
                newMap.set(entry[0], newValue);
            }
        })
        return newMap;
    }
}

export default Graph;


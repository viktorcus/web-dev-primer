/*
 *  index.ts
 *  Project: First Exercise
 *
 *  Author: Carolyn Seglem
 *  Created on: Jan 19, 2023
 */


// QUESTION 1: MERGING ARRAYS
function merge(arr1: Array<number>, arr2: Array<number>): Array<number> {
    let arrMerged: Array<number> = [];
    const maxIndex: number = arr1.length >= arr2.length ? arr1.length : arr2.length;
    for(let i: number = 0; i < maxIndex; i++) {
        if(i < arr1.length) {
            arrMerged.push(arr1[i]);
        }
        if(i < arr2.length) {
            arrMerged.push(arr2[i]);
        }
    }
    return arrMerged;
}


// QUESTION 2: WORDLE
function checkWord(attempt: string, answer: string): string {
    let evaluation: string = '';
    attempt = attempt.toLowerCase();
    answer = answer.toLowerCase();
    for(let i = 0; i < attempt.length; i++) {
        if(attempt[i] === answer[i]) {
            evaluation += 'c';
        }
        else if(answer.includes(attempt[i])) {
            evaluation += 'p'
        }
        else {
            evaluation += 'a'
        }
    }
    return evaluation;
}


// QUESTION 3: ELECTIONS

type Candidate = {
    name: string;
    votes: Array<number>;
    funding: number;
}

const candidates: Array<Candidate> = [
    { name: 'Edward Underwood', votes: [192, 147, 186, 114, 267], funding: 58182890 }, 
    { name: 'Rose Olson', votes: [48, 90, 12, 21, 13], funding: 78889263 }, 
    { name: 'Leonard Willis', votes: [206, 312, 121, 408, 382], funding: 36070689 }, 
    { name: 'Nathaniel Taylor', votes: [37, 21, 38, 39, 29], funding: 6317921937 }, 
];

function electionAnalysis(candidates: Array<Candidate>) {
    // total number and percent of votes received
    let voteTotal: number = 0;
    let candidateSums: Array<number> = [0, 0, 0, 0];
    let precinctSums: Array<number> = [0, 0, 0, 0, 0];

    // loop to pull and organize vote data from individual candidates
    for(let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        for(let j = 0; j < candidate.votes.length; j++) {
            const vote = candidate.votes[j];
            candidateSums[i] += vote;
            precinctSums[j] += vote;
            voteTotal += vote;
        }
    }

    // display stats
    const percent = (val: number) => `${(100 * val).toFixed(2)}%`;
    const dollar = (val: number) => `$${val.toFixed(2)}`

    for(let i = 0; i < candidates.length; i++) {
        console.log(
            `${candidates[i].name} -- ${candidateSums[i]} votes -- ${percent(candidateSums[i] / voteTotal)}`
        );
    }
    for(let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i]
        console.log(`\n${candidate.name}:`);
        for(let j = 0; j < candidate.votes.length; j++) {
            console.log(`Precinct ${j + 1}: -- ${percent(candidate.votes[j] / precinctSums[j])}`);
        }
    }
    console.log();
    for(let i = 0; i < candidates.length; i++) {
        console.log(
            `${candidates[i].name} spent ${dollar(candidates[i].funding / candidateSums[i])} per vote`
        );
    }

    // winner analysis
    const winner: number = candidateSums.findIndex(v => (v / voteTotal) > 0.5);
    if(winner > -1) {
        console.log(
            `\n${candidates[winner].name} won the election with ${percent(candidateSums[winner] / voteTotal)} of the vote!`
        );
    } 
    else {
        // hold onto two highest values, starting with 1st two candidates as default
        let runoffHighest: number = 0;
        let runoffSecond: number = 1;
        if(runoffHighest < runoffSecond) {
            runoffSecond = 1;
            runoffHighest = 0;
        }
        // cycle through remaining candidates for top two
        for(let i = 2; i < candidates.length; i++) {
            if(candidateSums[i] > candidateSums[runoffHighest]) {
                runoffSecond = runoffHighest;
                runoffHighest = i;
            } 
            else if(candidateSums[i] > candidateSums[runoffSecond]) {
                runoffSecond = i;
            }
        }
        console.log(
            `\nNo candidate won the race with 50% of the vote: A runoff election will be held between ${candidates[runoffHighest].name} and ${candidates[runoffSecond].name}`
        );
    }       
}
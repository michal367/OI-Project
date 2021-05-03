
export function getRandomIndexes(allIndexesNumber: number, numberToDraw: number) {
    let indexes = Array.from(Array(allIndexesNumber).keys());
    shuffleArray(indexes);
    return indexes.slice(0, numberToDraw)
}

function shuffleArray(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
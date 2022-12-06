import getData from '../utils/dataFetch'

// Get the marker from the code
function getMarker(code, markerLength) {
    for (let index = 0; index < code.length - markerLength; index++) {
        // Get the string starting at the index
        const markerCode = code.substring(index, index + markerLength)
        // Check if no repeats
        if (!(/(.).*\1/).test(markerCode)) return index + markerLength
    }
}

function day6(isPractice = false) {
    const dataToFetch = isPractice ? 'practice' : 'data'
    const [code] = getData('day6', dataToFetch, true)
    const part1 = getMarker(code, 4)
    const part2 = getMarker(code, 14)
    return {
        part1,
        part2
    }
}

export default day6
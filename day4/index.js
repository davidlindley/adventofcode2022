import getData from '../utils/dataFetch'
const isPractice = false
const dataToFetch = isPractice ? 'practice' : 'data'


function completeOverlap(part1, part2) {
    const [min1, max1] = part1
    const [min2, max2] = part2
    if (min2 >= min1 && max2 <= max1) return true
    if (min1 >= min2 && max1 <= max2) return true
    return false
}

function someOverlap(part1, part2) {
    const [min1, max1] = part1
    const [min2, max2] = part2

    // Check if the two values overlap in any way
    return (min1 >= min2 && min1 <= max2) ||
        (max1 >= min2 && max1 <= max2) ||
        (min2 >= min1 && min2 <= max1) ||
        (max2 >= min1 && max2 <= max1)
}


function init() {
    const data = getData('day4', dataToFetch, true)
    let part1Total = 0
    let part2Total = 0

    data.forEach((line) => {
        const [part1, part2] = line.split(',').map((section) => {
            return section.split('-').map((val) => parseInt(val, 10))
        })

        if (completeOverlap(part1, part2)) part1Total++
        if (someOverlap(part1, part2)) part2Total++
    })
    console.log('PART1', part1Total)
    console.log('PART2', part2Total)
}

init()
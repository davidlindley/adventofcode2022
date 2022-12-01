import dataFetchLineBreak from '../utils/dataFetchLineBreak'
const isPractice = false
const dataToFetch = isPractice ? 'practice' : 'data'

function parseData(data) {
    const sortedCals = data.map((elf) => {
        return elf.reduce((total, cal) => total + parseInt(cal), 0)
    }).sort((a, b) => a - b).reverse()
    return sortedCals
}

function init() {
    const data = dataFetchLineBreak('day1', dataToFetch).map((dataSet) => {
        return dataSet.split('\n')
    })
    const sortedCals = parseData(data)
    console.log('PART1', sortedCals[0])
    console.log('PART2', sortedCals[0] + sortedCals[1] + sortedCals[2])
}
init()
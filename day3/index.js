import getData from '../utils/dataFetch'
const isPractice = false
const dataToFetch = isPractice ? 'practice' : 'data'

// Gets repeated value out of two packs
function getRepeatedValue(pack1, pack2) {
  const repeatedChars = pack2.filter((char) => {
    return pack1.indexOf(char) !== -1
  })
  return repeatedChars
}

// Converts a character to a number
function getCharNumber(char) {
  const charCode = char.toLowerCase().charCodeAt(0) - 97 + 1
  // Add 26 if uppercase
  return char === char.toLowerCase() ? charCode : charCode + 26
}

function part1(data) {
  const total = data.reduce((acc, pack) => {
    // Split into an array
    const packArr = pack.split('')
    // Find the middle point
    const middleIndex = Math.ceil(packArr.length / 2)
    // Convert into two packs (pack1 and pack2)
    const pack1 = packArr.splice(0, middleIndex)
    const pack2 = packArr.splice(-middleIndex)
    // Get the repeated value
    const repeatedCharacter = getRepeatedValue(pack1, pack2)[0]
    // Add to the accumulator
    return acc + getCharNumber(repeatedCharacter)
  }, 0)
  return total
}

function part2(data) {
  let tempArr = []
  const res = data.reduce((acc, pack) => {
    // Split into an array
    const packStr = pack.split('')
    tempArr.push(packStr)
    if (tempArr.length !== 3) return acc
    const pack1Pack2Repeat = getRepeatedValue(tempArr[0], tempArr[1])
    const repeatedCharacter = getRepeatedValue(pack1Pack2Repeat, tempArr[2])
    const charNumber = getCharNumber(repeatedCharacter[0])
    // Reset the tempArr
    tempArr = []
    return acc + charNumber
  }, 0)
  return res
}

// Function run here
function init() {
  const data = getData('day3', dataToFetch, true)
  console.log('PART1', part1(data))
  console.log('PART2', part2(data))
}
init()
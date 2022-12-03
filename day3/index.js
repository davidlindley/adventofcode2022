import getData from '../utils/dataFetch'
const isPractice = true
const dataToFetch = isPractice ? 'practice' : 'data'

function getRepeatedValue(array) {
  const repeatedChars = array.filter((char, index) => {
    return array.indexOf(char) !== index
  })
  return repeatedChars
}

// TOOD: Each backpack can contain repeats

// Function run here
function init() {
  const data = getData('day3', dataToFetch, true)
  const backpacks = data.map((line) => {
    const lineArr = line.split('')
    const repeatedCharacters = getRepeatedValue(lineArr)
    // Split the array into two parts
    const middleIndex = Math.ceil(lineArr.length / 2)

    const firstHalf = lineArr.splice(0, middleIndex)
    const secondHalf = lineArr.splice(-middleIndex)
    return {
      pack1: firstHalf,
      pack2: secondHalf,
      repeatedCharacters,
    }
  })
  console.log(backpacks)
}
init()
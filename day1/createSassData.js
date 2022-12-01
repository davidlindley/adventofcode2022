import dataFetchLineBreak from '../utils/dataFetchLineBreak'
import fs from 'fs'
import path from 'path'

const isPractice = false
const dataToFetch = isPractice ? 'practice' : 'data'

function arrayToListStr(array) {
  return `( ${array.join(', ')} )`
}

function arrayToMapStr(array) {
  let str = '(\n'
  array.forEach((val, index) => {
    const parsedValue = Array.isArray(val) ? arrayToListStr(val) : val
    str += `${index}: ${parsedValue}`
    if (index !== array.length -1) str += ',\n'
  })
  str += `\n)`
  return str
}

function toSassVar(variableName, data) {
  return `$${variableName}: ${data};`
}

function writeData() {
  const data = dataFetchLineBreak('day1', dataToFetch).map((dataSet) => {
    return dataSet.split('\n')
  })

  const sassData = toSassVar('data', arrayToMapStr(data))
  
  const outputFile = path.resolve(process.cwd(), 'day1', 'sass', 'data.scss')
  fs.writeFileSync(outputFile, sassData)
}

writeData()
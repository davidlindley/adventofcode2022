import fs from 'fs'
import path from 'path'

function getData(day, file, splitLine = true) {
  const dataLoc = path.resolve(process.cwd(), day, 'data', file)
  const data = fs.readFileSync(dataLoc).toString()
  return splitLine ? data.split(/\r?\n/) : data
}

export default getData
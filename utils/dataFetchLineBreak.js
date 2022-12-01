import fs from 'fs'
import path from 'path'

function getData(day, file) {
  const dataLoc = path.resolve(process.cwd(), day, file)
  const data = fs.readFileSync(dataLoc).toString()
  return data.split(/\n\n/)
}

export default getData
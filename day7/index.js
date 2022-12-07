import getData from '../utils/dataFetch'

function getFileStructure(commands) {
    const directory = []
    const fileStructure = {
        '/': { files: {}, size: 0, directories: {}}
    }
    let curDir = fileStructure['/']
    for (let index = 0; index < commands.length; index++) {
        const command = commands[index];
        const [c1, c2, c3] = command.split(' ')
        if (c2 === 'cd') {
            if (c3 === '..') {
                // Go up a directory
                directory.pop()
            } else {
                // Go into a new directory
                directory.push(c3) // ['/', 'a', 'e]
            }
            // Get to the correct current dir
            curDir = fileStructure['/']
            for (let index = 0; index < directory.length; index++) {
                const dir = directory[index]
                if (!curDir.directories[dir]) curDir.directories[dir] = { files: {}, size: 0, directories: {} }
                curDir = curDir.directories[dir]
            }
        }
        // If there is a number then can assume it's a file
        if (!Number.isNaN(parseInt(c1))) {
            // Got the file location
            // fileStructure[directoryPath] +=
            curDir.files = {
                ...curDir.files,
                [c2]: c1
            }
            curDir.size += parseInt(c1)
        }
    }
    return fileStructure
}

function getDirSize(fileSystem, startingNode) {
   let directoriesSize = {}

   const recursiveDirFetch = (currentDirectory, key, currentPath) => {
    let totalSize = currentDirectory.size
    // If no sub directoried then end of this tree
    if (Object.keys(currentDirectory.directories).length === 0) {
        // Add this directory to the array with it's size
        directoriesSize[currentPath] = currentDirectory.size
        return currentDirectory.size
    }
    for (const dirKey in currentDirectory.directories) {
        if (Object.hasOwnProperty.call(currentDirectory.directories, dirKey)) {
            const newPath = `${currentPath}/${dirKey}`
            const subDirSize = recursiveDirFetch(currentDirectory.directories[dirKey], dirKey, newPath)
            totalSize += subDirSize
        }
    }
    directoriesSize[currentPath] = totalSize
    return totalSize
   }

    recursiveDirFetch(fileSystem[startingNode], startingNode, startingNode)
    return directoriesSize
}

function day7(isPractice = false) {
    const dataToFetch = isPractice ? 'practice' : 'data'
    const commands = getData('day7', dataToFetch, true)
    const fileStructure = getFileStructure(commands)
    const dirSizes = getDirSize(fileStructure, '/')
    /**
     * PART 1
     */
    const part1 = Object.keys(dirSizes).reduce((acc, dirKey) => {
        if(dirSizes[dirKey] <= 100000) acc += dirSizes[dirKey]
        return acc
    }, 0)

    /**
     * PART 2
     */
    const spaceNeeded = 30000000
    const totalDiskSpace = 70000000
    const totalAmountOfSpaceLeft = totalDiskSpace - dirSizes['/']
    const requiredToRemove = spaceNeeded - totalAmountOfSpaceLeft
    const dirToDelete = Object.keys(dirSizes).filter((dirKey) => {
        return dirSizes[dirKey] >= requiredToRemove
    }).sort((key1, key2) => {
        const a = dirSizes[key1]
        const b = dirSizes[key2]
        if (a > b) return 1
        if (a < b) return -1
        return 0
    })[0]
    return {
        part1,
        part2: dirSizes[dirToDelete]
    }
}

export default day7
import getData from '../utils/dataFetch'

function getFileStructure(commands) {
    const directory = []
    // Have a full tree view of the file structure including files, size and directories
    // NOTE: size only is the top size of all files NOT subdirectories at this point
    // as we don't know what the sub directories look like until we complete the commands
    const fileStructure = {
        '/': { files: {}, size: 0, directories: {}}
    }
    let curDir = fileStructure['/']
    for (let index = 0; index < commands.length; index++) {
        const command = commands[index]
        // Split the command
        const [c1, c2, c3] = command.split(' ')
        if (c2 === 'cd') {
            // Go up a directory or go into new directory
            c3 === '..' ? directory.pop() : directory.push(c3)
           
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
    // Out output
   const directoriesSize = {}

   // Our recursive directory sweep
   const recursiveDirFetch = (currentDirectory, currentPath) => {
    let totalSize = currentDirectory.size
    // If no sub directoried then end of this tree
    if (Object.keys(currentDirectory.directories).length === 0) {
        // Add this directory to the array with it's size
        directoriesSize[currentPath] = currentDirectory.size
        return currentDirectory.size
    }
    for (const dirKey in currentDirectory.directories) {
        if (Object.hasOwnProperty.call(currentDirectory.directories, dirKey)) {
            // As directories can be repeated need a unique idenitfier for them
            const newPath = `${currentPath}/${dirKey}`
            // Recurisvely find the size of this directory based on it's children (and children...etc etc)
            const subDirSize = recursiveDirFetch(currentDirectory.directories[dirKey], newPath)
            totalSize += subDirSize
        }
    }
    // Add to our directory size object
    directoriesSize[currentPath] = totalSize
    return totalSize
   }

   // Start the recursive fetch
    recursiveDirFetch(fileSystem[startingNode], startingNode)
    return directoriesSize
}

function day7(isPractice = false) {
    // Setup (get data)
    const dataToFetch = isPractice ? 'practice' : 'data'
    const commands = getData('day7', dataToFetch, true)
    // Get the file structure
    const fileStructure = getFileStructure(commands)
    // Get the directory sizes based on the file structure
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
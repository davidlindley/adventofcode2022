import getData from '../utils/dataFetch'
const isPractice = false
const dataToFetch = isPractice ? 'practice' : 'data'

// Runs the crane
function runCrane(instructions, stacks, multiMove) {
    instructions.forEach((instruction) => {
        // Get the moves list
        const [moveNum, startStack, endStack] = instruction.match(/(\d+)/g)
        // Carry out the instruction
        if (multiMove) {
           const itemsToMove = stacks[startStack - 1].splice(0, moveNum)
           stacks[endStack - 1] = [...itemsToMove, ...stacks[endStack - 1]]
        } else {
            for (let index = 0; index < moveNum; index++) {
                stacks[endStack - 1].unshift(stacks[startStack - 1].shift())
            }
        }
    })
    return stacks
}

// Converts the stacks into their code format
function getCode(stacks) {
    let code = ''
    stacks.forEach((stack) => {
        code += stack[0]
    })
    return code.replace(/\[|\]/g, '')
}

// Creates the initial stacks
function createInitialStacks(stacksArr) {
    // Get the total number of stacks
    const numberOfStacksArr = stacksArr[stacksArr.length - 1].trim().replace(/\s+/g, ',').split(',')
    const numOfStacks = parseInt(numberOfStacksArr[numberOfStacksArr.length - 1])
    // Create the empty stacks
    const stacks = []
    for (let index = 0; index < numOfStacks; index++) {
        stacks.push([])
    }

    // Put the boxes into the stacks
    stacksArr.slice(0, -1).forEach((horizontalStack) => {
        // Need to loop through the character sets to find which stack this is in
        const boxes = horizontalStack.match(/.{1,4}/g)
        boxes.forEach((box, index) => {
            if (box.indexOf('[') > -1) {
                // Can push box into a stack
                stacks[index].push(box.trim())
            }
        })
    })
    return stacks
}

// Gets the instructions and stacks
function parseData(lines) {
    const startOfInstructions = lines.indexOf('') + 1
    return {
        instructionsArr: lines.splice(startOfInstructions),
        stacksArr: lines.slice(0, -1)
    }
}


function init() {
    const data = getData('day5', dataToFetch, true)
    const { instructionsArr, stacksArr } = parseData(data)
    // PART 1
    const modifiedStacks = runCrane(instructionsArr, createInitialStacks(stacksArr), false)
    console.log('PART1', getCode(modifiedStacks))
    // PART 2
    const modifiedStacks2 = runCrane(instructionsArr, createInitialStacks(stacksArr), true)
    console.log('PART2', getCode(modifiedStacks2))
}

init()
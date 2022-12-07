import day7 from './index'

const { part1, part2 } = day7(true)
describe('day7', () => {
    it('should return the correct value for part 1', () => {
        expect(part1).toBe(95437)
    })
    it('should return the correct value for part 2', () => {
        expect(part2).toBe(24933642)
    }) 
});
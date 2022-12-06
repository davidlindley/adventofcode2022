import day6 from './index'

const { part1, part2 } = day6(true)
describe('day5', () => {
    it('should return the correct value for part 1', () => {
        expect(part1).toBe(7)
    })
    it('should return the correct value for part 2', () => {
        expect(part2).toBe(19)
    }) 
});
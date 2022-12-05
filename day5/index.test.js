import day5 from './index'

const { part1, part2 } = day5(true)
describe('day5', () => {
    it('should return the correct value for part 1', () => {
        expect(part1).toBe('CMZ')
    })
    it('should return the correct value for part 2', () => {
        expect(part2).toBe('MCD')
    })
});
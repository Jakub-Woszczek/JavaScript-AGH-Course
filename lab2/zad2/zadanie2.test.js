import { sum } from './zadanie2.js';

export function test_sum() {
    describe('The sum() function', function () {
        it('should return 4 for 2+2', function () {
            sum(2, 2).should.equal(4);
        });
        it('should return 0 for -2+2', function () {
            sum(-2, 2).should.equal(0);
        });
    });
}
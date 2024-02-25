"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../src/utils");
describe('Utility Functions', () => {
    let driver;
    let destination;
    describe('calculateSuitabilityScore', () => {
        beforeEach(() => {
            driver = 'Daniel Davidson';
        });
        test('odd length street name', () => {
            destination = '44 Fake Dr., San Diego, CA 92122';
            const { baseSuitabilityScore, pairingSuitabilityScore } = (0, utils_1.calculateSuitabilityScore)(driver, destination);
            expect(baseSuitabilityScore).toBe(9);
            expect(pairingSuitabilityScore).toBe(9);
        });
        test('even length street name', () => {
            destination = '144 Fake Dr., San Diego, CA 92122';
            const { baseSuitabilityScore, pairingSuitabilityScore } = (0, utils_1.calculateSuitabilityScore)(driver, destination);
            expect(baseSuitabilityScore).toBe(8);
            expect(pairingSuitabilityScore).toBe(12);
        });
    });
    test('countVowels should correctly count vowels', () => {
        expect((0, utils_1.countVowels)('John Smith')).toBe(2);
        expect((0, utils_1.countVowels)(' . ')).toBe(0);
        expect((0, utils_1.countVowels)('')).toBe(0);
    });
    test('countConsonants should correctly count consonants', () => {
        expect((0, utils_1.countConsonants)('John Smith')).toBe(7);
        expect((0, utils_1.countConsonants)(' . ')).toBe(0);
        expect((0, utils_1.countConsonants)('')).toBe(0);
    });
    describe('hasCommonFactors', () => {
        test('correctly identify common factors', () => {
            expect((0, utils_1.hasCommonFactors)(8, 12)).toBe(true);
            expect((0, utils_1.hasCommonFactors)(8, 15)).toBe(false);
        });
        test('driver and destination', () => {
            driver = 'Daniel Davidson';
            destination = '144 Fake Dr., San Diego, CA 92122';
            expect((0, utils_1.hasCommonFactors)(driver.length, destination.length)).toBe(true);
            destination = '44 Fake Dr., San Diego, CA 92122';
            expect((0, utils_1.hasCommonFactors)(driver.length, destination.length)).toBe(false);
        });
    });
});

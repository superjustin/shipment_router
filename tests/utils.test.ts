import { countVowels, countConsonants, hasCommonFactors, calculateSuitabilityScore } from '../src/utils';

describe('Utility Functions', () => {
  let driver: string;
  let destination: string;

  describe('calculateSuitabilityScore', () => {
    beforeEach(() => {
      driver = 'Daniel Davidson';
    });

    test('odd length street name', () => {
      destination = '44 Fake Dr., San Diego, CA 92122';
      const { baseSuitabilityScore, pairingSuitabilityScore } = calculateSuitabilityScore(driver, destination);
      expect(baseSuitabilityScore).toBe(9);
      expect(pairingSuitabilityScore).toBe(9);
    });

    test('even length street name', () => {
      destination = '144 Fake Dr., San Diego, CA 92122';
      const { baseSuitabilityScore, pairingSuitabilityScore } = calculateSuitabilityScore(driver, destination);
      
      expect(baseSuitabilityScore).toBe(8);
      expect(pairingSuitabilityScore).toBe(12);    
    });
  })

  test('countVowels should correctly count vowels', () => {
    expect(countVowels('John Smith')).toBe(2);
    expect(countVowels(' . ')).toBe(0);
    expect(countVowels('')).toBe(0);
  });

  test('countConsonants should correctly count consonants', () => {
    expect(countConsonants('John Smith')).toBe(7);
    expect(countConsonants(' . ')).toBe(0);
    expect(countConsonants('')).toBe(0);
  });

  describe('hasCommonFactors', () => {
    test('correctly identify common factors', () => {
      expect(hasCommonFactors(8, 12)).toBe(true);
      expect(hasCommonFactors(8, 15)).toBe(false);
    });

    test('driver and destination', () => {
      driver = 'Daniel Davidson';
      destination = '144 Fake Dr., San Diego, CA 92122';
      expect(hasCommonFactors(driver.length, destination.length)).toBe(true);

      destination = '44 Fake Dr., San Diego, CA 92122';
      expect(hasCommonFactors(driver.length, destination.length)).toBe(false);
    });
  });
  
});

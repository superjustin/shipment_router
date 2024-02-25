interface SuitabilityScore {
  baseSuitabilityScore: number;
  pairingSuitabilityScore: number;
}
const countVowels = (str: string) => str.match(/[aeiou]/gi)?.length || 0;

const countConsonants = (str: string) => str.match(/[bcdfghjklmnpqrstvwxyz]/gi)?.length || 0;

const hasCommonFactors = (a: number, b: number) => {
  const min = Math.min(a, b);
  for (let i = 2; i <= min; i++) {
    if (a % i === 0 && b % i === 0) return true;
  }
  return false;
};

const calculateSuitabilityScore = (driver: string, destination: string): SuitabilityScore => {
  const baseSuitabilityScore: number = destination.length % 2 === 0 ? countVowels(driver) * 1.5 : countConsonants(driver);
  const pairingSuitabilityScore: number = hasCommonFactors(driver.length, destination.length) ? baseSuitabilityScore * 1.5 : baseSuitabilityScore;
  return { baseSuitabilityScore, pairingSuitabilityScore };
};

export {
  countVowels,
  countConsonants,
  hasCommonFactors,
  calculateSuitabilityScore,
};

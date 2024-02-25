import { calculateSuitabilityScore } from './utils';

interface Assignment {
  driver: string;
  destination: string;
  baseSuitabilityScore: number;
  pairingSuitabilityScore: number;
}

interface AssignmentResult {
  totalSuitabilityScore: number;
  assignments: Assignment[];
}

const debugMode = process.argv.includes('-debug');

const assignShipments = (
  destinations: string[],
  drivers: string[]
): AssignmentResult => {
  let totalSuitabilityScore = 0;
  const assignments: Assignment[] = [];

  const pairs = drivers.flatMap(driver => destinations.map(destination => {
    const { baseSuitabilityScore, pairingSuitabilityScore } = calculateSuitabilityScore(driver, destination);
    return {
      driver,
      destination,
      baseSuitabilityScore,
      pairingSuitabilityScore
    };
  }));

  pairs.sort((a, b) => b.pairingSuitabilityScore - a.pairingSuitabilityScore);

  const assignedDrivers = new Set<string>();
  const assignedDestinations = new Set<string>();

  pairs.forEach(pair => {
    if (!assignedDrivers.has(pair.driver) && !assignedDestinations.has(pair.destination)) {
      assignments.push(pair);
      assignedDrivers.add(pair.driver);
      assignedDestinations.add(pair.destination);
      totalSuitabilityScore += pair.pairingSuitabilityScore;
    }
  });

  return { totalSuitabilityScore, assignments };
};

export { assignShipments, Assignment };

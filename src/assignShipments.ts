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

const generatePairs = (
  destinations: string[],
  drivers: string[],
): Assignment[] => {
  const pairs = drivers.flatMap(driver => destinations.map(destination => {
    const { baseSuitabilityScore, pairingSuitabilityScore } = calculateSuitabilityScore(driver, destination);
    return {
      driver,
      destination,
      baseSuitabilityScore,
      pairingSuitabilityScore
    };
  }));

  return pairs;
};

function findBestDestination(destinations: Assignment[], maxScore: number, assignedDrivers: Set<string>, assignedDestinations: Set<string>): Assignment | null {
  let bestDestination: Assignment | null = null;

  destinations.forEach(destination => {
      if (!assignedDrivers.has(destination.driver) && !assignedDestinations.has(destination.destination)) {
          if (destination.pairingSuitabilityScore > maxScore) {
              maxScore = destination.pairingSuitabilityScore;
              bestDestination = destination;
          }
      }
  });

  return bestDestination;
}

const assignShipmentsAscendingOrder = (
  destinations: string[],
  drivers: string[],
  debugMode: boolean | false,
): AssignmentResult => {
  let totalSuitabilityScore = 0;
  const assignments: Assignment[] = [];

  const pairs = generatePairs(destinations, drivers);

  const groupedByDriver: {[key: string]: Assignment[]} = {};
  pairs.forEach(pair => {
    if (!groupedByDriver[pair.driver]) {
      groupedByDriver[pair.driver] = [];
    }
    groupedByDriver[pair.driver].push(pair);
  });

  for (const driver in groupedByDriver) {
    groupedByDriver[driver].sort((a, b) => a.pairingSuitabilityScore - b.pairingSuitabilityScore);
  }

  const assignedDrivers = new Set<string>();
  const assignedDestinations = new Set<string>();

  const sortedDrivers = Object.keys(groupedByDriver).sort((a, b) => {
    const driverA = groupedByDriver[a][0].pairingSuitabilityScore;
    const driverB = groupedByDriver[b][0].pairingSuitabilityScore;
    return driverA - driverB;
  });

  sortedDrivers.forEach(driver => {
    const destinationsForDriver: Assignment[] = groupedByDriver[driver] || [];
    let maxSuitabilityScore = -Infinity;
  
    const bestDestination = findBestDestination(destinationsForDriver, maxSuitabilityScore, assignedDrivers, assignedDestinations);

    if (bestDestination) {
      assignments.push(bestDestination);
      assignedDrivers.add(bestDestination.driver);
      assignedDestinations.add(bestDestination.destination);
      totalSuitabilityScore += bestDestination.pairingSuitabilityScore;
    }
  });

  return { totalSuitabilityScore, assignments };

};

const assignShipments = (
  destinations: string[],
  drivers: string[],
  debugMode: boolean | false,
): AssignmentResult => {
  let totalSuitabilityScore = 0;
  const assignments: Assignment[] = [];

  const pairs = generatePairs(destinations, drivers);

  if (debugMode) {
    console.log(pairs);
  }

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

export { assignShipments, assignShipmentsAscendingOrder, Assignment };

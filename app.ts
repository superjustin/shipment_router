import { readFileSync } from 'fs';
import { assignShipments, assignShipmentsAscendingOrder, Assignment } from './src/assignShipments';

const chooseAssignmentWithHighestTotalSuitabilityScore = (destinations: string[], drivers: string[], debugMode: boolean): { totalSuitabilityScore: number, assignments: Assignment[] } => {
  let resultAscendingOrder = assignShipmentsAscendingOrder(destinations, drivers, debugMode);
  const result = assignShipments(destinations, drivers, debugMode);

  if (result.totalSuitabilityScore > resultAscendingOrder.totalSuitabilityScore) {
      resultAscendingOrder = result;
  }

  return resultAscendingOrder;
};


const debugMode = process.env.DEBUG === 'true';

const [shippingDestinationsFile, driversFile] = process.argv.slice(2, 4);

const destinations = readFileSync(shippingDestinationsFile, 'utf-8').split('\n').filter(Boolean);
const drivers = readFileSync(driversFile, 'utf-8').split('\n').filter(Boolean);

const { totalSuitabilityScore, assignments } = chooseAssignmentWithHighestTotalSuitabilityScore(destinations, drivers, debugMode);

console.log(`Total Suitability Score: ${totalSuitabilityScore}`);

assignments.forEach(({
  driver,
  destination,
  pairingSuitabilityScore,
  baseSuitabilityScore
}: Assignment) => {
  const output = `${driver} -> ${destination}`;
  if (debugMode) {
    console.log(`${output} | Pairing Suitability Score: ${pairingSuitabilityScore}, Base Suitability Score: ${baseSuitabilityScore}`);
  } else {
    console.log(output);
  }
});

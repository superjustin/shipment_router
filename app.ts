import { readFileSync } from 'fs';
import { assignShipments, Assignment } from './src/assignShipments';

const debugMode = process.env.DEBUG === 'true';

const [shippingDestinationsFile, driversFile] = process.argv.slice(2, 4);

const destinations = readFileSync(shippingDestinationsFile, 'utf-8').split('\n').filter(Boolean);
const drivers = readFileSync(driversFile, 'utf-8').split('\n').filter(Boolean);

const { totalSuitabilityScore, assignments } = assignShipments(destinations, drivers, debugMode);

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

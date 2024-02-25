import { assignShipments, Assignment } from '../src/assignShipments';
import { calculateSuitabilityScore } from '../src/utils';

jest.mock('../src/utils', () => ({
  calculateSuitabilityScore: jest.fn()
}));

describe('assignShipments', () => {
  it('should correctly assign shipments and calculate total suitability score', () => {
    const destinations = ['123 Street', '456 Avenue'];
    const drivers = ['John Doe', 'Jane Doe'];
    const mockedScores = [
      { baseSuitabilityScore: 10, pairingSuitabilityScore: 15 },
      { baseSuitabilityScore: 5, pairingSuitabilityScore: 7.5 },
      { baseSuitabilityScore: 15, pairingSuitabilityScore: 22.5 },
      { baseSuitabilityScore: 20, pairingSuitabilityScore: 30 },
    ];

    (calculateSuitabilityScore as jest.Mock).mockImplementation(() => mockedScores.shift());

    const result = assignShipments(destinations, drivers);

    expect(result.totalSuitabilityScore).toBe(45);
    expect(result.assignments.length).toBe(2);
    expect(calculateSuitabilityScore).toHaveBeenCalledTimes(destinations.length * drivers.length);
  });
});

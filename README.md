# Shipment Routing Application

This application assigns shipment destinations to drivers to maximize the total suitability score (SS), based on predefined algorithms. It's built with Node.js and TypeScript.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Initializing the Project

First, clone the repository to your local machine. Then, navigate to the project directory and install all require dependencies:

```bash
npm install
```

### Running Tests

To run the unit tests for the application, execute:
```bash
npm test
```

### Starting the Application

To run the unit tests for the application, execute:
```bash
npm start <path-to-destinations-file> <path-to-drivers-file>
```

Make sure to replace <path-to-destinations-file> and <path-to-drivers-file> with the paths to your actual input files. The first file should contain a list of shipment destination addresses, new line delimited. The second file should contain a list of driver names, also new line delimited.

#### Running Example Files

There is an example shipping destination and drivers file that is included to make sure your setup is correct and use as a model while building out your own input files.

```base
npm start example_destinations.txt example_drivers.txt 
```

#### Using Debug Mode

If you would like detailed output that includes each driver's pairing suitability score, you can run the application in debug mode:
```base
npm run start:debug -- <path-to-destinations-file> <path-to-drivers-file>
```

#### Input Files Format

- Destinations File: A text file where each line contains a single shipment destination address. Please take a look at example_destinations.txt for an example.
- Drivers File: A text file where each line contains a single driver's name. Please take a look at example_drivers.txt for an example.

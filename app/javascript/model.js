import {FUEL_PRICE, INFLATION} from "./constants";

export function calculateCosts(vehicle, circumstances) {
  var numYears = 5;

  var age = new Date().getFullYear() - vehicle.year;
  var yearsRemaining = vehicle.lifespan - age;
  var annualDepreciation = vehicle.value / yearsRemaining;

  var yearCosts = []
  for(var i=0; i<numYears; i++) {
    var costs = {};
    costs.maintenance = 1000;
    costs.warrantOfFitness = 100;
    costs.depreciation = annualDepreciation;

    var fuelPrice = FUEL_PRICE[vehicle.fuelType] * Math.pow(1.0 + INFLATION, i);
    costs.fuel = fuelPrice * (vehicle.fuelEconomy / 100.0) * circumstances.annualDistance;

    var value = vehicle.value - (i * annualDepreciation);
    costs.finance = value * (circumstances.interestRate / 100.0);

    yearCosts.push(costs);
  }

  console.log(yearCosts);
}

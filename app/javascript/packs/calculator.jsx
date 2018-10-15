import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import VehicleSearch from '../components/VehicleSearch';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { LIFESPAN, FUEL_NAME } from '../constants';
import {calculateCosts} from "../model";

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVehicle: {
        description: null,
        kerbWeight: null,
        fuelType: null,
        fuelEconomy: null,
        value: null,
      },
      newVehicle: {
        description: null,
        kerbWeight: null,
        fuelType: null,
        fuelEconomy: null,
        value: null,
      },
      circumstances: {
        annualDistance: null,
        interestRate: null,
      },
      currentVehicleCosts: null,
      newVehicleCosts: null,
    };
    this.selectNamedVehicle = this.selectNamedVehicle.bind(this);
    this.updateCalculations = this.updateCalculations.bind(this);
  };
  selectVehicle(name, option) {
    console.log(option);
    fetch(`/vehicles/${option.id}.json`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          [name]: {
            year: option.search_year,
            description: `${option.search_year} ${response.brand.name} ${response.model.name}`,
            kerbWeight: response.kerb_weight,
            fuelType: response.fuel_type,
            fuelEconomy: response.fuel_consumption_combined || response.average_energy_consumption,
            lifespan: LIFESPAN[response.fuel_type],
          },
        });
        console.log(response);
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  selectNamedVehicle(name) {
    return (option) => this.selectVehicle(name, option);
  }
  handleChange = (name1, name2) => event => {
    this.setState({
      [name1]: {
        ...this.state[name1],
        [name2]: event.target.value,
      },
    });
  };
  updateCalculations() {
    this.setState({
      currentVehicleCosts: calculateCosts(this.state.currentVehicle, this.state.circumstances),
      newVehicleCosts: calculateCosts(this.state.newVehicle, this.state.circumstances),
    });
  }
  render() {
    var { currentVehicle, circumstances, newVehicle, currentVehicleCosts, newVehicleCosts } = this.state;
    return (
      <div style={{display: 'flex'}}>
        <div style={{flex: 1}}>
          <h2>Step 1: Your Current Vehicle</h2>
          <VehicleSearch onChange={this.selectNamedVehicle('currentVehicle')} />
          <TextField
            style={{ display: 'block' }} fullWidth
            label="Vehicle Description"
            value={currentVehicle.description || ''}
            onChange={this.handleChange('currentVehicle', 'description')}
            onBlur={this.updateCalculations}
          />
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label="Kerb Weight (kg)"
            value={currentVehicle.kerbWeight || ''}
            onChange={this.handleChange('currentVehicle', 'kerbWeight')}
            onBlur={this.updateCalculations}
          />
          <TextField
            style={{ display: 'block' }} fullWidth select
            label="Fuel Type" value={currentVehicle.fuelType || ''}
            onChange={this.handleChange('currentVehicle', 'fuelType')}
            onBlur={this.updateCalculations}
          >
            <MenuItem value="petrol">Petrol</MenuItem>
            <MenuItem value="diesel">Diesel</MenuItem>
            <MenuItem value="electric">Electric</MenuItem>
          </TextField>
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label={currentVehicle.fuelType == "electric" ? "Energy usage (kW/100km, combined city/highway)" :
              "Fuel Economy (L/100km, combined city/highway)"}
            value={currentVehicle.fuelEconomy || ''}
            onChange={this.handleChange('currentVehicle', 'fuelEconomy')}
            onBlur={this.updateCalculations}
          />
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label="Total estimated lifespan (from new)"
            value={currentVehicle.lifespan || ''}
            onChange={this.handleChange('currentVehicle', 'lifespan')}
            onBlur={this.updateCalculations}
          />
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label="Current value"
            value={currentVehicle.value || ''}
            onChange={this.handleChange('currentVehicle', 'value')}
            onBlur={this.updateCalculations}
          />
          {currentVehicleCosts && <div>
            <table>
              <tbody>
                <tr><th>Depreciation</th><td>{currentVehicleCosts[0].depreciation}</td></tr>
                <tr><th>Finance</th><td>{currentVehicleCosts[0].finance}</td></tr>
                <tr><th>{FUEL_NAME[currentVehicle.fuelType]}</th><td>{currentVehicleCosts[0].fuel}</td></tr>
                <tr><th>Maintenance</th><td>{currentVehicleCosts[0].maintenance}</td></tr>
                <tr><th>Total</th><td>{currentVehicleCosts[0].total}</td></tr>
              </tbody>
            </table>
          </div>}
        </div>
        <div style={{flex: 1}}>
          <h2>Step 2: Your Life</h2>
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label="How many KM do you drive each year?"
            value={circumstances.annualDistance || ''}
            onChange={this.handleChange('circumstances', 'annualDistance')}
            onBlur={this.updateCalculations}
          />
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label="What is your interest rate (on the savings or debt that would be affected)?"
            value={circumstances.interestRate || ''}
            onChange={this.handleChange('circumstances', 'interestRate')}
            onBlur={this.updateCalculations}
          />
        </div>
        <div style={{flex: 1}}>
          <h2>Step 3: Your New Vehicle</h2>
          <VehicleSearch onChange={this.selectNamedVehicle('newVehicle')} />
          <TextField
            style={{ display: 'block' }} fullWidth
            label="Vehicle Description"
            value={newVehicle.description || ''}
            onChange={this.handleChange('newVehicle', 'description')}
            onBlur={this.updateCalculations}
          />
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label="Kerb Weight (kg)"
            value={newVehicle.kerbWeight || ''}
            onChange={this.handleChange('newVehicle', 'kerbWeight')}
            onBlur={this.updateCalculations}
          />
          <TextField
            style={{ display: 'block' }} fullWidth select
            label="Fuel Type" value={newVehicle.fuelType || ''}
            onChange={this.handleChange('newVehicle', 'fuelType')}
            onBlur={this.updateCalculations}
          >
            <MenuItem value="petrol">Petrol</MenuItem>
            <MenuItem value="diesel">Diesel</MenuItem>
            <MenuItem value="electric">Electric</MenuItem>
          </TextField>
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label={newVehicle.fuelType == "electric" ? "Energy usage (kW/100km, combined city/highway)" :
              "Fuel Economy (L/100km, combined city/highway)"}
            value={newVehicle.fuelEconomy || ''}
            onChange={this.handleChange('newVehicle', 'fuelEconomy')}
            onBlur={this.updateCalculations}
          />
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label="Purchase Price"
            value={newVehicle.value || ''}
            onChange={this.handleChange('newVehicle', 'value')}
            onBlur={this.updateCalculations}
          />
          {newVehicleCosts && <div>
            <table>
              <tbody>
              <tr><th>Depreciation</th><td>{newVehicleCosts[0].depreciation}</td></tr>
              <tr><th>Finance</th><td>{newVehicleCosts[0].finance}</td></tr>
              <tr><th>{FUEL_NAME[newVehicle.fuelType]}</th><td>{newVehicleCosts[0].fuel}</td></tr>
              <tr><th>Maintenance</th><td>{newVehicleCosts[0].maintenance}</td></tr>
              <tr><th>Total</th><td>{newVehicleCosts[0].total}</td></tr>
              </tbody>
            </table>
          </div>}
        </div>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Calculator />,
    document.body.appendChild(document.createElement('div')),
  )
});

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import VehicleSearch from '../components/VehicleSearch';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { LIFESPAN } from '../constants';

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
      }
    };
    this.selectNamedVehicle = this.selectNamedVehicle.bind(this);
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
  render() {
    var currentVehicle = this.state.currentVehicle;
    var newVehicle = this.state.newVehicle;
    return (
      <div style={{display: 'flex'}}>
        <div style={{flex: 1}}>
          <h2>Step 1: Your Current Vehicle</h2>
          <VehicleSearch onChange={this.selectNamedVehicle('currentVehicle')} />
          <TextField
            style={{ display: 'block' }} fullWidth
            label="Vehicle Description"
            value={currentVehicle.description || ''}
            onChange={this.handleChange('currentVehicle', 'description')} />
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label="Kerb Weight (kg)"
            value={currentVehicle.kerbWeight || ''}
            onChange={this.handleChange('currentVehicle', 'kerbWeight')} />
          <TextField
            style={{ display: 'block' }} fullWidth select
            label="Fuel Type" value={currentVehicle.fuelType || ''}
            onChange={this.handleChange('currentVehicle', 'fuelType')}>
            <MenuItem value="petrol">Petrol</MenuItem>
            <MenuItem value="diesel">Diesel</MenuItem>
            <MenuItem value="electric">Electric</MenuItem>
          </TextField>
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label={currentVehicle.fuelType == "electric" ? "Energy usage (kW/100km, combined city/highway)" :
              "Fuel Economy (L/100km, combined city/highway)"}
            value={currentVehicle.fuelEconomy || ''}
            onChange={this.handleChange('currentVehicle', 'fuelEconomy')} />
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label="Total estimated lifespan (from new)"
            value={currentVehicle.lifespan || ''}
            onChange={this.handleChange('currentVehicle', 'lifespan')} />
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label="Current value"
            value={currentVehicle.value || ''}
            onChange={this.handleChange('currentVehicle', 'value')} />
        </div>
        <div style={{flex: 1}}>
          <h2>Step 2: Your Life</h2>
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label="How many KM do you drive each year?"
            value={''}
            onChange={this.handleChange('annualDistance')} />
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label="What is your interest rate (on the savings or debt that would be affected)?"
            value={''}
            onChange={this.handleChange('interestRate')} />
        </div>
        <div style={{flex: 1}}>
          <h2>Step 3: Your New Vehicle</h2>
          <VehicleSearch onChange={this.selectNamedVehicle('newVehicle')} />
          <TextField
            style={{ display: 'block' }} fullWidth
            label="Vehicle Description"
            value={newVehicle.description || ''}
            onChange={this.handleChange('newVehicle', 'description')} />
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label="Kerb Weight (kg)"
            value={newVehicle.kerbWeight || ''}
            onChange={this.handleChange('newVehicle', 'kerbWeight')} />
          <TextField
            style={{ display: 'block' }} fullWidth select
            label="Fuel Type" value={newVehicle.fuelType || ''}
            onChange={this.handleChange('newVehicle', 'fuelType')}>
            <MenuItem value="petrol">Petrol</MenuItem>
            <MenuItem value="diesel">Diesel</MenuItem>
            <MenuItem value="electric">Electric</MenuItem>
          </TextField>
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label="Fuel Economy (L/100km, combined city/highway)"
            value={newVehicle.fuelEconomy || ''}
            onChange={this.handleChange('newVehicle', 'fuelEconomy')} />
          <TextField
            style={{ display: 'block' }} fullWidth type="number"
            label="Purchase Price"
            value={newVehicle.value || ''}
            onChange={this.handleChange('newVehicle', 'value')} />
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

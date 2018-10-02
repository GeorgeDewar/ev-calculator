import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import VehicleSearch from '../components/VehicleSearch';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle_description: null,
      kerb_weight: null,
      fuel_type: null,
      fuel_economy: null,
    };
    this.selectVehicle = this.selectVehicle.bind(this);
  }
  selectVehicle(option) {
    console.log(option);
    fetch(`/vehicles/${option.id}.json`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          description: `${option.search_year} ${response.brand.name} ${response.model.name}`,
          kerb_weight: response.kerb_weight,
          fuel_type: response.fuel_type,
          fuel_economy: response.fuel_consumption_combined,
        });
        console.log(response);
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  render() {
    return (
      <div>
        <h2>Select your current vehicle</h2>
        <VehicleSearch onChange={this.selectVehicle} />
        <TextField
          style={{ display: 'block' }} fullWidth
          label="Vehicle Description"
          value={this.state.description || ''}
          onChange={this.handleChange('description')} />
        <TextField
          style={{ display: 'block' }} fullWidth type="number"
          label="Kerb Weight (kg)"
          value={this.state.kerb_weight || ''}
          onChange={this.handleChange('kerb_weight')} />
        <TextField
          style={{ display: 'block' }} fullWidth select
          label="Fuel Type" value={this.state.fuel_type || ''}
          onChange={this.handleChange('fuel_type')}>
          <MenuItem value="petrol">Petrol</MenuItem>
          <MenuItem value="diesel">Diesel</MenuItem>
          <MenuItem value="electric">Electric</MenuItem>
        </TextField>
        <TextField
          style={{ display: 'block' }} fullWidth type="number"
          label="Fuel Economy (L/100km, combined city/highway)"
          value={this.state.fuel_economy || ''}
          onChange={this.handleChange('fuel_economy')} />

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

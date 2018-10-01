import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import VehicleSearch from '../components/VehicleSearch';
import TextField from '@material-ui/core/TextField';

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kerb_weight: null,
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
        <VehicleSearch onChange={this.selectVehicle} />
        <TextField label="Kerb Weight (kg)" value={this.state.kerb_weight || ''}
                   onChange={this.handleChange('kerb_weight')} />
        <TextField label="Fuel Type" value={this.state.fuel_type || ''}
                   onChange={this.handleChange('fuel_type')} />
        <TextField label="Fuel Economy (L/100km, combined city/highway)" value={this.state.fuel_economy || ''}
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

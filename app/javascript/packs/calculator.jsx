import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import VehicleSearch from '../components/VehicleSearch';
import TextField from '@material-ui/core/TextField';

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kerb_weight: '',
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
        this.setState({ kerb_weight: response.kerb_weight });
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

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import VehicleSearch from 'components/VehicleSearch'

export default class Calculator extends Component {

  render() {
    return (
      <div>Hello!
        <VehicleSearch/>
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

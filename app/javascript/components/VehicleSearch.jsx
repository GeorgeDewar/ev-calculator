import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import AsyncSelect from 'react-select/lib/Async';

const promiseOptions = inputValue =>
  new Promise(resolve => {
    var year = inputValue.split(" ")[0]
    fetch(`/vehicles/search?q=${inputValue}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => response.map(item => ({label: year + ' ' + item.full_description, ...item})))
      .then(resolve)
      .catch((error) => {
        console.warn(error);

      });
  });

export default class WithPromises extends Component {
  state = { inputValue: '' };
  handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };
  render() {
    return (
      <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} />
    );
  }
}

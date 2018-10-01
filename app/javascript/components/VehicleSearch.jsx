import React, { Component } from 'react'
import AsyncSelect from 'react-select/lib/Async';
import { components } from 'react-select';

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

const Option = (props) => {
  return (
    <components.Option {...props}>
      <div>{props.data.label} (<span style={{fontStyle: 'italic'}}>{props.data.generation_name}</span>)</div>
    </components.Option>
  );
};

export default class WithPromises extends Component {
  render() {
    return (
      <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} components={{ Option }} {...this.props} />
    );
  }
}

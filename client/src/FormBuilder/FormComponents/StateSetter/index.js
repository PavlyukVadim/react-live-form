import React, { Component } from 'react';

class StateSetter extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      state: {},
    };
    this.addState = this.addState.bind(this);
  }
  
  addState() {
    const prop = this.statePropInput.value;
    const value = this.stateValueInput.value;

    const newState = {
      [prop]: value,
    };
    this.setState((prevState) => {
      const state = Object.assign({}, prevState.state, newState);
      return {
        state,
      };
    }, () => this.updateState());
  }

  updateState() {
    const {
      fieldConfig,
      changeFormField,
    } = this.props;
    changeFormField(fieldConfig.name, 'value', this.state.state);
    this.statePropInput.value = '';
    this.stateValueInput.value = '';
  }

  render() {
    return (
      <div className="form-group row">
        <title className="col-xxxs-6">Change State:</title>
        <div className="col-xxxs-6">
          <input
            className="form-input"
            type="text"
            ref={(input) => {this.statePropInput = input;}}
            placeholder="name"
          />
          <input
            className="form-input"
            type="text"
            ref={(input) => {this.stateValueInput = input;}}
            placeholder="value"
          />
          <input
            type="button"
            value="add state"
            onClick={this.addState}
          />
        </div>
      </div>
    );
  }
};

export default StateSetter;

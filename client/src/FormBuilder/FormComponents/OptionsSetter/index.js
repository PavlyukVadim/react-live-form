import React, { Component } from 'react';
import './OptionsSetter.scss';

class OptionsSetter extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
    this.addOption = this.addOption.bind(this);
  }
  
  addOption() {
    const value = this.optionInput.value;
    const newOption = {
      value,
      content: value,
    };
    this.setState((prevState) => {
      const newOptions = [...prevState.options, newOption];
      return {
        options: newOptions,
      };
    }, () => this.updateOptions());
  }

  updateOptions() {
    const {
      fieldConfig,
      changeFormField,
    } = this.props;
    changeFormField(fieldConfig.name, 'value', this.state.options);
    this.optionInput.value = '';  
  }

  render() {
    return (
      <div className="optionsSetter form-group row">
        <div className="col-xxxs-6">Add new option:</div>
        <div className="col-xxxs-6">
          <input
            className="form-input"
            type="text"
            ref={(input) => {this.optionInput = input;}}
          />
          <input
            className="form-button"
            type="button"
            value="ok"
            onClick={this.addOption}
          />  
        </div>
      </div>
    );
  }
};

export default OptionsSetter;

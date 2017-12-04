import React, { Component } from 'react';

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
      <div className="form-group">
        <input
          className="form-input"
          type="text"
          ref={(input) => {this.optionInput = input;}}
        />
        <input
          type="button"
          value="add option"
          onClick={this.addOption}
        />
      </div>
    );
  }
};

export default OptionsSetter;

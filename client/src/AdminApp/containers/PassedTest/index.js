import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import analysisFormDeps from './../../../UserApp/containers/TestPage/analysisFormDeps';
import callUpdateOnSubscribers from './../../../UserApp/containers/TestPage/callUpdateOnSubscribers';
import changeFormField from './../../../UserApp/containers/TestPage/changeFormField';
import Test from './../../../UserApp/components/Test';

const getFieldsDefaultValues = (fields) => {
  const fieldsDefaultValues = {};
  for (const field of fields) {
    fieldsDefaultValues[field.name] = {
      value: field.defaultValue || 0
    };
  }
  return fieldsDefaultValues;
};

const getFormState = (
  status,
  state,
  answers,
  comment,
) => {
  if (status === 'new') {
    return state;
  }
  const newAnswers = {};
  for (const key in answers) {
    newAnswers[key] = Object.assign({}, answers[key]);
    newAnswers[key].disabled = true;
  }
  if (status === 'assessed') {
    newAnswers['comment'] = {
      value: comment,
    };
  }

  return newAnswers;
};

const updateFormConfig = (formConfig, status) => {
  const updatedFormConfig = [].concat(formConfig);
  // if (status === 'assessed') {
  //   const commentField = {
  //     name: 'comment',
  //     fieldType: 'textarea',
  //     dataType: 'string',
  //     title: 'Admin comment:',
  //     defaultValue: '',
  //   };
  //   updatedFormConfig.push(commentField);
  // }
  return updatedFormConfig;
};

const getFormConfig = (props) => {
  let formConfig = [];
  if (props.data && props.data.loading) {
    return formConfig;
  }
  if (props.status === 'new') {
    if (!props.data && !props.data.testById) {
      return;
    }
    formConfig = props.data.testById.formConfig;  
  } else if (props.status === 'passed') {
    if (!props.data && !props.data.answerById) {
      return;
    }
    formConfig = props.data.answerById.test.formConfig;
  }
  return formConfig;
};

class TestPage extends Component {
  constructor(props) {
    super(props);
    const formConfig = getFormConfig(props);
    this.state = getFieldsDefaultValues(formConfig);
    this.formElements = {}; //analysisFormDeps(this, formConfig);
    this.changeFormField = this.changeFormField.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    this.firstFieldsUpdate();
  }

  componentWillReceiveProps(newProps) {
    let formConfig;
    if (this.props.status === 'assessed') {
      if (!(newProps.data && newProps.data.answerById)) {
        return;
      }
      formConfig = newProps.data.answerById.test.formConfig;
    }
    
    this.formElements = analysisFormDeps(this, formConfig);
    this.setState(() => {
      return getFieldsDefaultValues(formConfig);
    }, () => {
      this.firstFieldsUpdate();
    });
  }

  firstFieldsUpdate() {
    for (const key in this.formElements) {
      const formElement = this.formElements[key];
      const fieldSubscribers = formElement.subscribers;
      callUpdateOnSubscribers(fieldSubscribers, this.formElements);
    }
  }

  changeFormField(fieldName, propName, propValue) {
    changeFormField(this, fieldName, propName, propValue);
  }

  formSubmit() {
    const values = this.state;
    const testId = this.props.data.testById.test_id;
    const userId = '1';
    const formAnswers = JSON.stringify(values);
    const statusId = '1';
    
    this.props.mutate({
      variables: {
        testId,
        userId,
        formAnswers,
        statusId,
      }
    }).then(() => this.props.history.push('/user/passed'));
  }

  render() {
    const {
      data,
      status,
    } = this.props;

    if (data.loading) {
      return (
        <div>loading</div>
      );
    }

    let formConfig, answers, comment;
    if (status === 'new') {
      formConfig = [].concat(data.testById.formConfig);
    } else if (status === 'passed') {
      formConfig = [].concat(data.answerById.test.formConfig);
      answers = Object.assign({}, data.answerById.form_answers);
    } else if (status === 'assessed') {
      formConfig = [].concat(data.answerById.test.formConfig);
      answers = Object.assign({}, data.answerById.form_answers);
      comment = data.answerById.comment.content;
    }
    
    const formState = getFormState(
      status,
      this.state,
      answers,
      comment,
    );

    const updatedFormConfig = updateFormConfig(
      formConfig,
      status
    );

    return (
      <div>
        <Test
          testStatus={status}
          formState={formState}
          formConfig={updatedFormConfig}
          changeFormField={this.changeFormField}
          formSubmit={this.formSubmit}
        />
        <div className="admin-Comment">
          <div className="form-group row">
            <label className="form-label col-xxxs-6">Admin comment:</label>
            <textarea className="form-textarea col-xxxs-6">{comment}</textarea>
          </div>
        </div>
      </div>
    );
  }
}

const AnswerById = gql`
  query AnswerById($answerId: String!) {
    answerById(id: $answerId) {
      answer_id
      status_id
      form_answers
      test {
        test_id
        title
        formConfig
      }
      comment {
        comment_id
        content
      }
    }
  }
`;

const TestPageWithData = graphql(
  AnswerById, {
    options: ({ answerId }) => ({ variables: { answerId } }),
  }
)(TestPage);

export default TestPageWithData;

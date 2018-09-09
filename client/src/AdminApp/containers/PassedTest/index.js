import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import {
  Button,
  Dialog,
} from 'react-toolbox/lib';
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
    this.changeComment = this.changeComment.bind(this);
    this.goToPassed = this.goToPassed.bind(this);
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
    const userId = window.localStorage.getItem('rr_userId');
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

  changeComment() {
    const answerId = this.props.data.answerById.answer_id;
    const userId = window.localStorage.getItem('rr_userId');
    const content = this.commentInput.value;

    this.props.mutate({
      variables: {
        answerId,
        userId,
        content
      },
      // refetchQueries: [{
      //   query: fetchPassedTests,
      //   variables: {
      //     userId: window.localStorage.getItem('rr_userId'),
      //   },
      // }]
    }).then(() => this.setState({isDialogActive: true}));
  }

  goToPassed() {
    this.props.history.push('/admin/passed');
  }

  render() {
    console.log('Test Page', this.props);

    const {
      data,
      status,
    } = this.props;

    if (data.loading) {
      return (
        <div>loading</div>
      );
    }

    if (!data.answerById) {
     return (
        <div>loading</div>
      ); 
    }

    let formConfig, answers, comment;
    if (status === 'assessed') {
      formConfig = [].concat(data.answerById.test.formConfig);
      answers = Object.assign({}, data.answerById.form_answers);
      comment = data.answerById.comment.content;
      if (comment) {
        comment = comment.trim();
      }
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

    const actions = [{ label: "Ok", onClick: this.goToPassed }];
    const isDialogActive = this.state.isDialogActive;

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
            <textarea
              className="form-textarea col-xxxs-6"
              ref={(input) => { this.commentInput = input; }}
            >
              {comment}
            </textarea>
          </div>
          <Button
            className="form-submit"
            onClick={this.changeComment}
            icon='send'
            label='Change comment'
            raised
            primary
          />
          <Dialog
            active={!!isDialogActive}
            actions={actions}
            onEscKeyDown={this.goToPassed}
            onOverlayClick={this.goToPassed}
            title='Success!'
          >
            <p>Your comment was successfully saved!</p>
          </Dialog>
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

const AddComment = gql`
  mutation AddComment(
    $answerId: String!,
    $userId: String!,
    $content: String!
  ) {
    AddComment(
      answerId: $answerId,
      userId: $userId,
      content: $content
    ) {
      answer_id
    }
  }
`;

const testPageWithAnswer = graphql(AnswerById, {
  options: ({ answerId }) => ({
    variables: { answerId },
    fetchPolicy: 'network-only',
  }),
});

const testPageWithMutation = graphql(AddComment);

const TestPageWithData = compose(
  testPageWithAnswer,
  testPageWithMutation,
)(TestPage);

export default TestPageWithData;

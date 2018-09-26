import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import LiveForm from 'src/FormBuilder';

const story = storiesOf('ConfigWithExternalFuncs', module);
story.addDecorator(withKnobs);
story.add(
  'config with external functions',
  withInfo({
    text: 'config that contains some state functions from dataSource',
  })(() => {
    const formConfigObj = {
      formName: 'firstForm',
      fields: [
        {
          name: 'a',
          fieldType: 'input',
          dataType: 'int',
          props: {
            title: 'field a',
          },
          state: {
            value: {
              defaultValue: 5,
            },
          },
        },
        {
          name: 'b',
          fieldType: 'input',
          dataType: 'string',
          props: {
            title: 'field b',
          },
          state: {
            date: {
              defaultValue: '30.08.1998',
              valueFn: 'getDateValue',
              watch: ['a'],
            },
          },
        },
      ],
      onSubmit: 'submitFunction',
    };

    const dataSource = {
      d: {
        date: {},
      },
    };

    const getDateValue = () => new Date();

    dataSource.d.date.getDateValue = getDateValue;

    const formConfig = object('formConfig', formConfigObj);

    return (
      <LiveForm
        formConfig={formConfig}
        dataSource={dataSource}
      />
    );
  }),
);

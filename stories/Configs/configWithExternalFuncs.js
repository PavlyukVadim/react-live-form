import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import LiveForm from 'src/FormBuilder';

const story = storiesOf('3. Configs', module);
story.addDecorator(withKnobs);
story.add(
  '3.2 withExternalFuncs',
  withInfo({
    text: 'config that contains some state functions from dataSource',
  })(() => {
    const formConfigObj = {
      formName: 'firstForm',
      fields: [
        {
          name: 'a',
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

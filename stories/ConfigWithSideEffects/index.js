import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import LiveForm from 'src/FormBuilder';

const story = storiesOf('ConfigWithSideEffects', module);
story.addDecorator(withKnobs);
story.add(
  'config with side effects',
  withInfo({
    text: 'config that contains fields that have a big hierarchy of dependencies',
  })(() => {

    const formConfigObj = {
      formName: 'sideEffectsForm',
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
          dataType: 'int',
          props: {
            title: 'field b',
          },
          state: {
            value: {
              defaultValue: 0,
              valueExpr: 'a * 2',
            },
          },
        },
        {
          name: 'c',
          fieldType: 'input',
          dataType: 'string',
          props: {
            title: 'field c',
          },
          state: {
            value: {
              defaultValue: 0,
              valueExpr: 'b * 2',
            },
          },
        },
        {
          name: 'd',
          fieldType: 'input',
          dataType: 'string',
          props: {
            title: 'field d',
          },
          state: {
            value: {
              defaultValue: 0,
              valueExpr: 'c * 2',
            },
          },
        },
      ],
      onSubmit: 'submitFunction',
    };

    const formConfig = object(
      'formConfig',
      formConfigObj
    );

    return (
      <LiveForm
        formConfig={formConfig}
      />
    )
  }));

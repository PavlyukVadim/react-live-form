import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import LiveForm from 'src/FormBuilder';

const story = storiesOf('2. FieldsValueExpr/2.3 PreDefinedFuncs', module);
story.addDecorator(withKnobs);
story.add(
  '2.3.1. random',
  withInfo({
    text: 'Get a random number in the range [0, n). If n is zero, or not provided, it defaults to 1.',
  })(() => {
    const formConfigObj = {
      formName: 'firstForm',
      fields: [
        {
          name: 'parent1',
          fieldType: 'input',
          props: {
            title: 'parent1',
          },
          state: {
            value: {
              defaultValue: 100,
            },
          },
        },
        {
          name: 'child',
          fieldType: 'input',
          props: {
            title: 'child = random[0, p1)',
          },
          state: {
            value: {
              defaultValue: 0,
              valueExpr: 'random(parent1)',
            },
          },
        },
      ],
      onSubmit: 'submitFunction',
    };

    const formConfig = object('formConfig', formConfigObj);

    return (
      <LiveForm formConfig={formConfig} />
    );
  }),
);

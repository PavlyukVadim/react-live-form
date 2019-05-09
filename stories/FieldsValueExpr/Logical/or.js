import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import LiveForm from 'src/FormBuilder';

const story = storiesOf('2. FieldsValueExpr/2.2 Logical', module);
story.addDecorator(withKnobs);
story.add(
  '2.2.1. or',
  withInfo({
    text: 'Logical OR',
  })(() => {
    const formConfigObj = {
      formName: 'firstForm',
      fields: [
        {
          name: 'parent1',
          fieldType: 'checkbox',
          props: {
            title: 'parent1',
          },
          state: {
            value: {
              defaultValue: true,
            },
          },
        },
        {
          name: 'parent2',
          fieldType: 'checkbox',
          props: {
            title: 'parent2',
          },
          state: {
            value: {
              defaultValue: false,
            },
          },
        },
        {
          name: 'child',
          fieldType: 'checkbox',
          props: {
            title: 'child = (p1 || p2)',
          },
          state: {
            value: {
              defaultValue: false,
              valueExpr: 'parent1 or parent2',
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

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import LiveForm from 'src/FormBuilder';

const story = storiesOf('2. FieldsValueExpr/2.3 PreDefinedFuncs', module);
story.addDecorator(withKnobs);
story.add(
  '2.3.3. min/max',
  withInfo({
    text: 'Get the smallest (largest) number in the list',
  })(() => {
    const formConfigObj = {
      formName: 'firstForm',
      fields: [
        {
          name: 'parent1',
          fieldType: 'input',
          dataType: 'int',
          props: {
            title: 'parent1',
          },
          state: {
            value: {
              defaultValue: 0,
            },
          },
        },
        {
          name: 'parent2',
          fieldType: 'input',
          dataType: 'int',
          props: {
            title: 'parent2',
          },
          state: {
            value: {
              defaultValue: 1,
            },
          },
        },
        {
          name: 'parent3',
          fieldType: 'input',
          dataType: 'int',
          props: {
            title: 'parent3',
          },
          state: {
            value: {
              defaultValue: 2,
            },
          },
        },
        {
          name: 'min',
          fieldType: 'input',
          dataType: 'int',
          props: {
            title: 'min',
          },
          state: {
            value: {
              defaultValue: 0,
              valueExpr: 'min(parent1, parent2, parent3)',
            },
          },
        },
        {
          name: 'max',
          fieldType: 'input',
          dataType: 'int',
          props: {
            title: 'max',
          },
          state: {
            value: {
              defaultValue: 0,
              valueExpr: 'max(parent1, parent2, parent3)',
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

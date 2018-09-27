import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import LiveForm from 'src/FormBuilder';

const story = storiesOf('2. FieldsValueExpr/2.2 Logical', module);
story.addDecorator(withKnobs);
story.add(
  '2.2.3. ternary',
  withInfo({
    text: 'Ternary conditional (if x then y else z)',
  })(() => {
    const formConfigObj = {
      formName: 'firstForm',
      fields: [
        {
          name: 'parent1',
          fieldType: 'checkbox',
          dataType: 'bool',
          props: {
            title: '°F',
          },
          state: {
            value: {
              defaultValue: true,
            },
          },
        },
        {
          name: 'child',
          fieldType: 'input',
          dataType: 'string',
          props: {
            title: 'child',
          },
          state: {
            value: {
              defaultValue: false,
              valueExpr: 'parent1 ? "Fahrenheit" : "Cesium"',
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

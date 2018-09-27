import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import LiveForm from 'src/FormBuilder';

const story = storiesOf('2. FieldsValueExpr/2.3 PreDefinedFuncs', module);
story.addDecorator(withKnobs);
story.add(
  '2.3.2. roundTo',
  withInfo({
    text: 'Rounds x to n places after the decimal point.',
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
              defaultValue: 100,
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
          name: 'child',
          fieldType: 'input',
          dataType: 'int',
          props: {
            title: 'child = roundTo(random[0, p1), p2)',
          },
          state: {
            value: {
              defaultValue: 0,
              valueExpr: 'roundTo(random(parent1), parent2)',
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

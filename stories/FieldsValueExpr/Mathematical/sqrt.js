import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import LiveForm from 'src/FormBuilder';

const story = storiesOf('2. FieldsValueExpr/2.1 Mathematical', module);
story.addDecorator(withKnobs);
story.add(
  '2.1.4. sqrt',
  withInfo({
    text: 'basic mathematical expression',
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
              defaultValue: 256,
            },
          },
        },
        {
          name: 'child',
          fieldType: 'input',
          dataType: 'int',
          props: {
            title: 'child = √p1',
          },
          state: {
            value: {
              defaultValue: 0,
              valueExpr: 'sqrt(parent1)',
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

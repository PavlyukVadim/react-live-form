import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
  object,
  text,
  boolean,
} from '@storybook/addon-knobs/react';

import LiveForm from 'src/FormBuilder';

const story = storiesOf('Fields', module);
story.addDecorator(withKnobs);
story.add(
  'textarea',
  withInfo({
    text: 'basic textarea field config',
  })(() => {
    const formConfigObj = {
      formName: 'firstForm',
      fields: [
        {
          name: 'a',
          fieldType: 'textarea',
          dataType: 'int',
          props: {
            title: text('title', 'field a'),
          },
          state: {
            value: {
              defaultValue: text('defaultValue', '5'),
            },
            disabled: {
              defaultValue: boolean('disabled', false),
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

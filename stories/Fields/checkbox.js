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

const story = storiesOf('1. Fields', module);
story.addDecorator(withKnobs);
story.add(
  '1.2. checkbox',
  withInfo({
    text: 'basic checkbox field config',
  })(() => {
    const formConfigObj = {
      formName: 'firstForm',
      fields: [
        {
          name: 'a',
          fieldType: 'checkbox',
          props: {
            title: text('title', 'field a'),
          },
          state: {
            value: {
              defaultValue: boolean('defaultValue', true),
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

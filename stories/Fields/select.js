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
  'select',
  withInfo({
    text: 'basic select field config',
  })(() => {
    const formConfigObj = {
      formName: 'firstForm',
      fields: [
        {
          name: 'a',
          fieldType: 'select',
          dataType: 'string',
          props: {
            title: text('title', 'field a'),
            multiple: boolean('multiple', false),
            options: object('options',
              [
                {
                  value: 'option1',
                  content: 'option1',
                },
                {
                  value: 'option2',
                  content: 'content for value2',
                },
                {
                  value: 'option3',
                  content: 'option3',
                },
              ]),
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

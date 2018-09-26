import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
  object,
  text,
} from '@storybook/addon-knobs/react';

import LiveForm from 'src/FormBuilder';

const story = storiesOf('Field', module);
story.addDecorator(withKnobs);
story.add(
  'single field config',
  withInfo({
    text: 'basic formConfig for the demo',
  })(() => {

    const formConfigObj = {
      formName: 'firstForm',
      fields: [
        {
          name: 'a',
          fieldType: 'input',
          dataType: 'int',
          props: {
            title: text('title', 'field a'),
          },
          state: {
            value: {
              defaultValue: text('defaultValue', '5'),
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

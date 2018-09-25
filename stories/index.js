import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import LiveForm from '../src/FormBuilder';
import formConfig from '../src/Example/formConfig';

storiesOf('Button', module)
  .add('with text', () => (
    <LiveForm
      formConfig={formConfig}
    />
  ));

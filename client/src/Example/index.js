import React from 'react';
import LiveForm from '../FormBuilder';

import formConfig from './formConfig';
import dataSource from './dataSource';

const Example = () => (
  <LiveForm
    formConfig={formConfig}
    dataSource={dataSource}
  />
);

export default Example;

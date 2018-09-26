import { configure } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';

function loadStories() {
  require('../stories/Field/index.js');
  require('../stories/Demo/index.js');
  require('../stories/ConfigWithSideEffects/index.js');
  require('../stories/ConfigWithExternalFuncs/index.js');

  // You can require as many stories as you need.
}

configure(loadStories, module);

// addon-info
setDefaults({
  header: true, // Toggles display of header with component name and description
  inline: true, // Displays info inline vs click button to view
  maxPropsIntoLine: 2, // Max props to display per line in source code
});

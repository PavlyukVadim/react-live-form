import { configure } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';

function loadStories() {
  // fields
  require('../stories/Fields/input.js');
  require('../stories/Fields/checkbox.js');
  require('../stories/Fields/textarea.js');
  require('../stories/Fields/select.js');

  // fieldsValueExpr

  // mathematical
  require('../stories/FieldsValueExpr/Mathematical/sum.js');
  require('../stories/FieldsValueExpr/Mathematical/multiplication.js');
  require('../stories/FieldsValueExpr/Mathematical/power.js');
  require('../stories/FieldsValueExpr/Mathematical/sqrt.js');

  // Logical

  require('../stories/FieldsValueExpr/Logical/or.js');
  require('../stories/FieldsValueExpr/Logical/and.js');
  require('../stories/FieldsValueExpr/Logical/ternary.js');

  // preDefinedFuncs

  require('../stories/FieldsValueExpr/PreDefinedFuncs/random.js');
  require('../stories/FieldsValueExpr/PreDefinedFuncs/roundTo.js');
  require('../stories/FieldsValueExpr/PreDefinedFuncs/minMax.js');

  // configs

  require('../stories/Configs/configWithSideEffects.js');
  require('../stories/Configs/configWithExternalFuncs.js');
  require('../stories/Configs/demo.js');

  // You can require as many stories as you need.
}

configure(loadStories, module);

// addon-info
setDefaults({
  header: true, // Toggles display of header with component name and description
  inline: true, // Displays info inline vs click button to view
  maxPropsIntoLine: 2, // Max props to display per line in source code
});

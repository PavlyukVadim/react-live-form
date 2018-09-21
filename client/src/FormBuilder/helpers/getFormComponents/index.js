import React from 'react';
import getFormItemByFieldType from '../getFormItemByFieldType';

const getFormComponents = (
  formState,
  liveFormFields = [],
  onChangeFormField,
) => (
  liveFormFields.map((field) => {
    const { fieldType } = field;
    const FormItem = getFormItemByFieldType(fieldType);
    if (!FormItem) return null;
    const fieldName = field.name;

    return (
      <div key={fieldName}>
        {
          formState[fieldName].display !== false
            ? (
              <FormItem
                fieldConfig={field}
                fieldState={formState[fieldName]}
                onChangeFormField={onChangeFormField}
              />
            )
            : null
        }
      </div>
    );
  })
);

export default getFormComponents;

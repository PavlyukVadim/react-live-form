import React from 'react';
import getFormItemByFieldType from '../getFormItemByFieldType';

const getFormComponents = (
  formState,
  fields = [],
  changeFormField,
) => (
  fields.map((field) => {
    const FormItem = getFormItemByFieldType(field.fieldType);
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
                changeFormField={changeFormField}
              />
            )
            : null
        }
      </div>
    );
  })
);

export default getFormComponents;

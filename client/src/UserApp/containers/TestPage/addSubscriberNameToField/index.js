const addSubscriberNameToField = (field, subscriberName) => {
  if (field.subscribers) {
    if(!field.subscribers.includes(subscriberName)) {
      field.subscribers.push(subscriberName);
    }
  } else {
    field.subscribers = [subscriberName];
  }
};

export default addSubscriberNameToField;

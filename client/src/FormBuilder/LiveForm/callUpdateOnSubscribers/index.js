const callUpdateOnSubscribers = (fieldSubscribers, formElements) => {
  if (fieldSubscribers) {
    fieldSubscribers.forEach((subscriberName) => {
      console.log('subscriberName', subscriberName, formElements[subscriberName]);
      formElements[subscriberName].update();
    });
  }
};

export default callUpdateOnSubscribers;

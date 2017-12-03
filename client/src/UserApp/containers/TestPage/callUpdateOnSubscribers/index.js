const callUpdateOnSubscribers = (fieldSubscribers, formElements) => {
  if (fieldSubscribers) {
    for (const subscriberName of fieldSubscribers) {
      formElements[subscriberName].update();
    }
  }
};

export default callUpdateOnSubscribers;

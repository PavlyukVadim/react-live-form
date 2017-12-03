const updateFieldSubscribers = (fieldSubscribers, formElements) => {
  if (fieldSubscribers) {
    for (const subscriberName of fieldSubscribers) {
      formElements[subscriberName].update();
    }
  }
};

export default updateFieldSubscribers;

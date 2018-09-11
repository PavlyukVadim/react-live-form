const addFieldSubscriber = (field, subscriberName) => {
  const { subscribers = [] } = field;
  const newSubscribers = [...subscribers];
  if (!subscribers.includes(subscriberName)) {
    newSubscribers.push(subscriberName);
  }
  return newSubscribers;
};

export default addFieldSubscriber;

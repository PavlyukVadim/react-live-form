const getFormState = (
  status,
  state,
  answers,
) => {
  if (status === 'new') {
    return state;
  }

  const newAnswers = {};

  Object.keys(answers).forEach((key) => {
    newAnswers[key] = Object.assign({}, answers[key]);
    newAnswers[key].disabled = true;
  });

  return newAnswers;
};

export default getFormState;

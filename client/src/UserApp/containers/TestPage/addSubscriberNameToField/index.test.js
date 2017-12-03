import addSubscriberNameToField from './index';

describe('analysisFormDeps', () => {
  test('return obj with subscs for field w/o subscs', () => {
    const field = {};
    const subscriberName = 'field1';
    addSubscriberNameToField(field, subscriberName);
    const expectedResult = {
      subscribers: ['field1'],
    };
    expect(field).toEqual(expectedResult);
  });

  test('return obj with 1 subsc for field with the same subsc', () => {
    const field = {
      subscribers: ['field1'],
    };
    const subscriberName = 'field1';
    addSubscriberNameToField(field, subscriberName);
    const expectedResult = {
      subscribers: ['field1'],
    };
    expect(field).toEqual(expectedResult);
  });

  test('return obj new subsc for field w/o the same subsc', () => {
    const field = {
      subscribers: ['field1'],
    };
    const subscriberName = 'field2';
    addSubscriberNameToField(field, subscriberName);
    const expectedResult = {
      subscribers: ['field1', 'field2'],
    };
    expect(field).toEqual(expectedResult);
  });
});

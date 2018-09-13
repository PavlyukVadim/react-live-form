import addFieldSubscriber from './index';

describe('analysisFormDeps', () => {
  test('should return array of subs for field w/o subscs', () => {
    const field = {};
    const subscriberName = 'field1';
    const result = addFieldSubscriber(field, subscriberName);
    const expectedResult = ['field1'];
    expect(result).toEqual(expectedResult);
  });

  test('should return array with 1 subs for field with the same subsc', () => {
    const field = {
      subscribers: ['field1'],
    };
    const subscriberName = 'field1';
    const result = addFieldSubscriber(field, subscriberName);
    const expectedResult = ['field1'];
    expect(result).toEqual(expectedResult);
  });

  test('should return array of new subs for field w/o the same subsc', () => {
    const field = {
      subscribers: ['field1'],
    };
    const subscriberName = 'field2';
    const result = addFieldSubscriber(field, subscriberName);
    const expectedResult = ['field1', 'field2'];
    expect(result).toEqual(expectedResult);
  });
});

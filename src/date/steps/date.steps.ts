import { defineFeature, loadFeature, DefineStepFunction } from 'jest-cucumber';

const mockDateMock = (date: Date = new Date()) => {
  const OriginalDate = Date;

  return class MockDate extends Date {
    constructor(d?: string | number | Date) {
      super();

      return d ? new OriginalDate(d) : date;
    }
  };
};

let nowDate = '1977-11-04T09:07:19.309Z';

Object.defineProperty(global, 'Date', {
  value: mockDateMock(new Date(nowDate)),
  writable: true,
});

// Under test
import { date } from '../date';

defineFeature(loadFeature('./src/date/date.feature'), test => {
  const givenIAmInTimezone = (given: DefineStepFunction) => {
    given(/^I am within the (\w+) timezone$/, timezone => {
      expect(process.env.TZ).toEqual(timezone);
    });
  };

  test('I can get the current date', ({ given, when, then }) => {
    let d: Date;

    givenIAmInTimezone(given);

    when('I ask for the current date', () => {
      d = date();
    });

    then('I should get the current date', () => {
      expect(d.toISOString()).toEqual(nowDate);
    });
  });

  test('I can get a specific date', ({ given, when, then }) => {
    let specificDate: string;
    let d: Date;

    givenIAmInTimezone(given);

    when(/^I ask for the date ([\w|:|.|\-]+)$/, testDate => {
      specificDate = testDate;
      d = date(specificDate);
    });

    then('I should get the expected date', () => {
      expect(d.toISOString()).toEqual(specificDate);
    });
  });
});

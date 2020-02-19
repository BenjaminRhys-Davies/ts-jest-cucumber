import { defineFeature, loadFeature, DefineStepFunction } from 'jest-cucumber';
import { options } from '../../cucumber';

// Under test
import { date } from '../date';

defineFeature(loadFeature('../date.feature', options), test => {
  const mockDateMock = (date: Date = new Date()) => {
    const OriginalDate = Date;

    return class MockDate extends Date {
      constructor(d?: string | number | Date) {
        super();

        return d ? new OriginalDate(d) : date;
      }
    };
  };
  const nowDate = '1977-11-04T09:07:19.309Z';

  const givenIAmInTimezone = (given: DefineStepFunction) => {
    given(/^I am within the (\w+) timezone$/, timezone => {
      expect(process.env.TZ).toEqual(timezone);
    });
  };

  beforeAll(() => {
    Object.defineProperty(global, 'Date', {
      value: mockDateMock(new Date(nowDate)),
      writable: true,
    });
  });

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
    let outputDates: Date[];
    let inputDates: string[];

    givenIAmInTimezone(given);

    when('I ask for the date:', (table: { date: string }[]) => {
      inputDates = table.map(({ date }) => date);
      outputDates = table.map(({ date: inputDate }) => date(inputDate));
    });

    then('I should get the expected date', () => {
      expect(outputDates.length).toBe(inputDates.length);
      outputDates.forEach((outputDate, i) => {
        expect(outputDate.toISOString()).toEqual(inputDates[i]);
      });
    });
  });

  test('I can get an example date', ({ given, when, then }) => {
    let d: Date;

    givenIAmInTimezone(given);

    when(/^I ask for a (.*)$/, inputDate => {
      d = date(inputDate);
    });

    then(/^I should get (.*)$/, expectedDate => {
      expect(d.toISOString()).toEqual(expectedDate);
    });
  });
});

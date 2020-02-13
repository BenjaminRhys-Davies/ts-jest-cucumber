// Under test
import { date } from './date';

const mockDateMock = (date: Date = new Date()) => {
  const OriginalDate = Date;

  return class MockDate extends Date {
    constructor(d?: string | number | Date) {
      super();

      return d ? new OriginalDate(d) : date;
    }
  };
};

const nowDateTime = '1977-11-04T09:07:19.309Z';

Object.defineProperty(global, 'Date', {
  value: mockDateMock(new Date(nowDateTime)),
  writable: true,
});

describe('date ()', () => {
  describe('should return', () => {
    describe('a fixed', () => {
      beforeEach(() => {});

      it('date object', () => {
        expect(date()).toEqual(new Date(nowDateTime));
      });

      it('with expected dateTime', () => {
        expect(date().toISOString()).toEqual(nowDateTime);
      });
    });
    describe('a dynamic', () => {
      const dynamicDateTime = '2020-02-13T12:40:29.139Z';

      it('date object', () => {
        expect(date(dynamicDateTime)).toEqual(new Date(dynamicDateTime));
      });

      it('with expected dateTime', () => {
        expect(date(dynamicDateTime).toISOString()).toEqual(dynamicDateTime);
      });
    });
  });
});

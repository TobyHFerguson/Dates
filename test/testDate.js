const dates = require('../src/dates');

describe("date tests", () => {
    describe("dates.convert() tests", () => {
        test("should return the original date", () => {
            let d = new Date();
            expect(dates.convert(d)).toEqual(d);
        });
        test("should convert a number", () => {
            let n = 12345;
            let d = new Date(n);
            expect(dates.convert(d)).toEqual(d);
        });
        test("should return NaN", () => {
            expect(dates.convert(() => { })).toBeNaN();
        });
        test("should convert a date string", () => {
            let ds = "Tue Jul 08 2025 10:00:00 GMT-0700 (Pacific Daylight Time)";
            let expected = new Date(ds).toString();
            let actual = dates.convert(ds);
            expect(actual).not.toBeNaN();
            expect(actual.toString()).toEqual(expected);
        });
        test("should handle getters", () => {
            let ds = "Tue Jul 08 2025 10:00:00 GMT-0700 (Pacific Daylight Time)";
            let tc = { get StartDate() { return ds; } };
            let expected = new Date(tc.StartDate).toString();
            let actual = dates.convert(tc.StartDate);
            expect(actual).not.toBeNaN();
            expect(actual.toString()).toEqual(expected);
        });
        test("should handle class getters and setters", () => {
            let ds = "Tue Jul 08 2025 10:00:00 GMT-0700 (Pacific Daylight Time)";
            class Schedule {
                _date = "Tue Jul 08 2025 10:00:00 GMT-0700 (Pacific Daylight Time)";
                get date() { return this._date; }
            }
            class Row {
                constructor(s) {
                    this.schedule = s;
                }
                get StartDate() { return this.schedule.date; }
            }
            let r = new Row(new Schedule());
            let expected = new Date(ds).toString();
            expect(expected).not.toEqual("Invalid Date");
            let actual = dates.convert(r.StartDate).toString();
            expect(actual).toEqual(expected);
        });
    });
    describe("dates.MMDD() tests", () => {
        test("should create a date that looks like MM/DD", () => {
            let n = 12345;
            let d = new Date(n);
            expect(dates.MMDD(d)).toEqual("12/31");
        });
        test("should produce a NaN when the date is busted", () => {
            expect(dates.MMDD(() => { })).toBeNaN();
        });
    });
    describe("dates.MMDDYYYY() tests", () => {
        test("should create a date that looks like MM/DD/YYYY", () => {
            let n = 12345;
            let d = new Date(n);
            expect(dates.MMDDYYYY(d)).toEqual("12/31/1969");
        });
        test("should produce a NaN when the date is busted", () => {
            expect(dates.MMDD(() => { })).toBeNaN();
        });
    });
    describe("dates.YYYY_MM_DD() tests", () => {
        test("should create a date that looks like YYYY-MM-DD", () => {
            let n = "2023-01-01T10:00:00-08:00";
            let d = new Date(n);
            expect(dates.YYYY_MM_DD(d)).toEqual("2023-01-01");
        });
        test("should produce a NaN when the date is busted", () => {
            expect(dates.MMDD(() => { })).toBeNaN();
        });
    });
    describe("dates.weekday() tests", () => {
        test("should produce a three letter weekday", () => {
            let n = 12345;
            let d = new Date(n);
            expect(dates.weekday(d)).toEqual("Wed");
        });
        test("should produce a NaN when the date is busted", () => {
            expect(dates.weekday(() => { })).toBeNaN();
        });
    });
    describe("dates.T24", () => {
        test("should produce a 24 hour time", () => {
            let n = "2023-01-01T18:00:00.000Z";
            let d = new Date(n);
            expect(dates.T24(d)).toEqual("10:00");
        });
        test('should produce 10:00 from the string "2023-06-01T18:00:00.000Z"', () => {
            let n = "2023-06-01T18:00:00.000Z";
            let d = new Date(n);
            expect(dates.T24(d)).toEqual("10:00");
        });
        test("should produce a NaN when the date is busted", () => {
            expect(dates.T24(() => { })).toBeNaN();
        });
    });
    describe("dates.add()", () => {
        test("should return a date that is one day more than the initial day, including months and years", () => {
            const d = new Date("12/31/2023");
            expect(dates.add(d, 1)).toEqual(new Date("1/1/2024"));
        });
    });
    describe("dates.T12()", () => {
        let options = { timeZone: 'America/Los_Angeles' };
        test("should return a 12 hour representation of a time in LA timeZone", () => {
            const d = new Date("2023-01-01T13:15:00.000-08:00");
            expect(dates.T12(d)).toEqual("1:15 PM");
        });
        test("should convert 10:00 AM to 10:00 AM", () => {
            const d = new Date("2023-01-01 10:00 AM GMT-0800");
            expect(dates.T12(d)).toEqual("10:00 AM");
        });
        test("should convert to 10:00 AM", () => {
            const d = new Date("1899-12-30T18:00:00.000Z");
            expect(dates.T12(d)).toEqual("10:00 AM");
        });
    });
    describe("dates.addMinutes()", () => {
        test("should return a time that is 15 minutes less", () => {
            const d = new Date("2023-01-01T13:15:00");
            expect(dates.addMinutes(d, -15)).toEqual(new Date("2023-01-01T13:00:00"));
        });
    });
});
const should = require('chai').should();
const dates = require('../src/dates');
const sinon = require('sinon');


describe("date tests", () => {
    describe("dates.convert() tests", () => {
        it("should return the original date", () => {
            let d = new Date();
            dates.convert(d).should.deep.equal(d);
        })
        it("should convert a number", () => {
            let n = 12345;
            let d = new Date(n);
            dates.convert(d).should.deep.equal(d);
        })
        it("should return NaN", () => {
            dates.convert(() => { }).should.be.NaN;
        })
        it("should convert a date string", () => {
            let ds = "Tue Jul 08 2025 10:00:00 GMT-0700 (Pacific Daylight Time)"
            let expected = new Date(ds).toString();
            let actual = dates.convert(ds);
            actual.should.not.be.NaN;
            actual.toString().should.equal(expected);
        })
        it("should handle getters", () => {
            
            let ds = "Tue Jul 08 2025 10:00:00 GMT-0700 (Pacific Daylight Time)"
            let tc = { get StartDate() { return ds;}}
            let expected = new Date(tc.StartDate).toString();
            let actual = dates.convert(tc.StartDate);
            actual.should.not.be.NaN;
            actual.toString().should.equal(expected);
        })
        it("should handle class getters and setters", () => {
            let ds = "Tue Jul 08 2025 10:00:00 GMT-0700 (Pacific Daylight Time)"
            class Schedule {
                _date = "Tue Jul 08 2025 10:00:00 GMT-0700 (Pacific Daylight Time)"
                get date() { return this._date; }
            }
            class Row {
                constructor(s) {
                    this.schedule = s;
                }
                get StartDate() { return this.schedule.date}

            }
            let r = new Row(new Schedule());
            let expected = new Date(ds).toString();
            expected.should.not.equal("Invalid Date");
            let actual = dates.convert(r.StartDate).toString();
            actual.should.equal(expected);
        })
    })
    describe("dates.MMDD() tests", () => {
        it("should create a date that looks like MM/DD", () => {
            let n = 12345;
            let d = new Date(n);
            dates.MMDD(d).should.equal("12/31");
        })
        it("should produce a Nan when the date is busted", () => {
            dates.MMDD(() => { }).should.be.NaN;
        })
    })
    describe("dates.MMDDYYYY() tests", () => {
        it("should create a date that looks like MM/DD/YYYY", () => {
            let n = 12345;
            let d = new Date(n);
            dates.MMDDYYYY(d).should.equal("12/31/1969");
        })
        it("should produce a NaN when the date is busted", () => {
            dates.MMDD(() => { }).should.be.NaN;
        })
    })
    describe("dates.YYYY_MM_DD() tests", () => {
        it("should create a date that looks like YYYY-MM-DD", () => {
            let n = "2023-01-01T10:00:00-08:00";
            let d = new Date(n);
            dates.YYYY_MM_DD(d).should.equal("2023-01-01");
        })
        it("should produce a NaN when the date is busted", () => {
            dates.MMDD(() => { }).should.be.NaN;
        })
    })
    describe("dates.weekday() tests", () => {
        it("should produce a three letter weekday", () => {
            let n = 12345;
            let d = new Date(n);
            dates.weekday(d).should.equal("Wed");
        })
        it("should produce a NaN when the date is busted", () => {
            dates.weekday(() => { }).should.be.NaN;
        })
    })
    describe("dates.T24", () => {
        it("should produce a 24 hour time", () => {
            let n = "2023-01-01T18:00:00.000Z"
            let d = new Date(n);
            dates.T24(d).should.equal("10:00");
        })
        it("should produce a NaN when the date is busted", () => {
            dates.T24(() => { }).should.be.NaN;
        })
    })
    describe("dates.add()", () => {
        it("should return a date that is one day more than the initial day, including months and years", () => {
            const d = new Date("12/31/2023");
            dates.add(d, 1).should.deep.equal(new Date("1/1/2024"))
        })
    })
    describe("dates.T12()", () => {
        let options = { timeZone: 'America/Los_Angeles' }
        it("should return a 12 hour representation of a time in LA timeZone", () => {
            const d = new Date("2023-01-01T13:15:00.000-08:00");
            dates.T12(d).should.equal("1:15 PM");
        })
        it("should convert 10:00 AM to 10:00 AM", () => {
            const d = new Date("2023-01-01 10:00 AM GMT-0800")
            dates.T12(d).should.equal("10:00 AM");
        })
        it("should convert to 10:00 AM", () => {
            const d = new Date("1899-12-30T18:00:00.000Z");
            console.log(d);
            dates.T12(d).should.equal("10:00 AM");
        })
    })
    describe("dates.addMinutes()", () => {
        it("should return a time that is 15 minutes less", () => {
            const d = new Date("2023-01-01T13:15:00");
            dates.addMinutes(d, -15).should.deep.equal(new Date("2023-01-01T13:00:00"));
        })
    })
})
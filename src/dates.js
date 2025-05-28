function convert(d) {
      // Converts the date in d to a date-object. The input can be:
      //   a date object: returned without modification
      //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
      //   a number     : Interpreted as number of milliseconds
      //                  since 1 Jan 1970 (a timestamp) 
      //   a string     : Any format supported by the javascript engine, like
      //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
      //  an object     : Interpreted as an object with year, month and date
      //                  attributes.  **NOTE** month is 0-11.
      // Returns NaN if the input cannot be converted to a Date object
      // return (
        if (d.constructor === Date) { return new Date(d) };
        if (d.constructor === Array) { return new Date(d[0], d[1], d[2]) };
        if (d.constructor === String) { return new Date(d) };
        if (typeof d === "object") {
          let result = new Date(d)
          if (result.toString() !== "Invalid Date") {
            return result
          }
          result = new Date(d.year, d.month, d.date);
          if (result.toString() !== "Invalid Date") {
            return result
          }
        };
        if(Number.isFinite(d)) { return new Date(d)}
        return NaN;
      }

function compare(a, b) {
      // Compare two dates (could be of any type supported by the convert
      // function above) and returns:
      //  -1 : if a < b
      //   0 : if a = b
      //   1 : if a > b
      // NaN : if a or b is an illegal date
      // NOTE: The code inside isFinite does an assignment (=).
      return (
        isFinite(a = convert(a).valueOf()) &&
          isFinite(b = convert(b).valueOf()) ?
          (a > b) - (a < b) :
          NaN
      );
}
function inRange(d, start, end) {
      // Checks if date in d is between dates in start and end.
      // Returns a boolean or NaN:
      //    true  : if d is between start and end (inclusive)
      //    false : if d is before start or after end
      //    NaN   : if one or more of the dates is illegal.
      // NOTE: The code inside isFinite does an assignment (=).
      return (
        isFinite(d = convert(d).valueOf()) &&
          isFinite(start = convert(start).valueOf()) &&
          isFinite(end = convert(end).valueOf()) ?
          start <= d && d <= end :
          NaN
      );
}
function MMDDYYYY(d) {
      // Returns the shortened MM/DD/YYYY version of the date
      return isFinite(a = convert(d)) ? a.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles", year: "numeric", month: "numeric", day: "numeric" }) : NaN;
}
function YYYY_MM_DD(d) {
      return isFinite(a = convert(d)) ? a.toLocaleDateString("en-CA") : NaN;
  
}
function MMDD(d) {
      return isFinite(a = convert(d)) ? a.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles",month: "numeric", day: "numeric" }) : NaN;
}
function weekday(d) {
      return isFinite(a = convert(d)) ? a.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles",weekday: "short" }) : NaN;
}
function T24(d) {
      return isFinite(a = convert(d)) ? a.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour: "numeric", minute: "numeric", hour12: false }) : NaN;
}
function T12(d) {
      return isFinite(a = convert(d)) ? a.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour: "numeric", minute: "numeric", hour12: true }) : NaN;
}
function add(d, days) {
      let a = convert(d);
      if (isFinite(a)) {
        a.setDate(a.getDate() + days);
      }
      return a;
}
function addMinutes(d, minutes) {
      let a = convert(d);
      if (isFinite(a)) {
        a = convert(Number(convert(a)) + minutes * 60 * 1000);
      }
      return a;
    }


  if (!(typeof module === 'undefined')) {
    module.exports = {add, addMinutes, convert, compare, MMDD, MMDDYYYY, inRange, YYYY_MM_DD, weekday, T12, T24};
  }  
const Event = require("./Event");
const EventForPay = require("./EventForPay");

function fullDateWithouthours(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return new Date(Date.UTC(year, month, day, 0, 0, 0));
}

function isDayTime(date) {
  const hours = date.getHours();
  return hours > 6 && hours < 22;
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function convertEventToEventForPay(event) {
  // Si le même jour
  if (
    fullDateWithouthours(event.startDate).getTime() ===
    fullDateWithouthours(event.endDate).getTime()
  ) {
    //Si que en journée ou que la nuit le même jour
    if (
      (isDayTime(event.startDate) && isDayTime(event.endDate)) ||
      (!isDayTime(event.startDate) && !isDayTime(event.endDate))
    ) {
      return new EventForPay([event]);
      // Si le même jour mais début en journée et fin la nuit
    } else if (isDayTime(event.startDate) && !isDayTime(event.endDate)) {
      const date = fullDateWithouthours(event.startDate);
      const event1 = new Event(event.startDate, date.setHours(21, 59, 59));
      const event2 = new Event(date.setHours(22, 0, 0), event.endDate);
      let events = [event1, event2];
      return new EventForPay(events);
    } else {
      return false;
    }
  }
  // Si le lendemain
  else if (
    fullDateWithouthours(event.startDate).addDays(1).getTime() ===
    fullDateWithouthours(event.endDate).getTime()
  ) {
    // Si ça commence la journée le 1er jour et ça fini la nuit le deuxième
    if (isDayTime(event.startDate) && !isDayTime(event.endDate)) {
      const newEndDate = fullDateWithouthours(event.startDate);
      const newStartDate = fullDateWithouthours(event.endDate);
      const event1 = new Event(
        event.startDate,
        newEndDate.setHours(21, 59, 59)
      );
      const event2 = new Event(newStartDate.setHours(22, 0, 0), event.endDate);
      let events = [event1, event2];
      return new EventForPay(events);
      // Si ça commence la nuit le 1er jour et ça fini la journée le deuxième
    } else if (!isDayTime(event.startDate) && isDayTime(event.endDate)) {
      const newEndDate = fullDateWithouthours(event.startDate);
      const newStartDate = fullDateWithouthours(event.endDate);
      const event1 = new Event(event.startDate, newEndDate.setHours(5, 59, 59));
      const event2 = new Event(newStartDate.setHours(6, 0, 0), event.endDate);
      let events = [event1, event2];
      return new EventForPay(events);
    } else {
      const newEndDate = fullDateWithouthours(event.startDate);
      const newStartDate = fullDateWithouthours(event.endDate);
      const event1 = new Event(
        event.startDate,
        newEndDate.setHours(21, 59, 59)
      );
      const event2 = new Event(
        newEndDate.setHours(22, 0, 0),
        newStartDate.setHours(5, 59, 59)
      );
      const event3 = new Event(newStartDate.setHours(6, 0, 0), event.endDate);

      let events = [event1, event2, event3];
      return new EventForPay(events);
    }
  } else {
    return false;
  }
}
module.exports = convertEventToEventForPay;

  let events = [];

  function convertR(event) {
    if (
      // fullDateWithouthours(event.startDate).getTime() ===
      //   fullDateWithouthours(event.endDate).getTime() &&
      
      ((isDayTime(event.startDate) && isDayTime(event.endDate)) ||
        (!isDayTime(event.startDate) && !isDayTime(event.endDate)))
    ) {
      events.push(event);
      return new EventForPay(events);
    } else if (isDayTime(event.startDate)) {
      const date = fullDateWithouthours(event.startDate);
      const first = new Event(
        event.startDate,
        new Date(date.setHours(21, 59, 59))
      );
      events.push(first);

      const next = new Event(new Date(date.setHours(22, 0, 0)), event.endDate);

      return convertR(next);
    } else if (!isDayTime(event.startDate)) {

      const date = fullDateWithouthours(event.startDate);
      const first = new Event(
        event.startDate,
        new Date(date.setHours(5, 59, 59))
      );
      events.push(first);

      const next = new Event(new Date(date.setHours(6, 0, 0)), event.endDate);
      return convertR(next);

    } else {
      return false;
    }
  }


module.exports = convertR;

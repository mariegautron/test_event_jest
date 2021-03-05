const Event = require("./Event");
const EventForPay = require("./EventForPay");

function fullDateWithouthours(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  return new Date(year, month, day);
}

function isDayTime(date) {
  const hours = date.getHours();
  return hours > 6 && hours < 22;
}

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

      const event1 = new Event(event.startDate, date.setHours(22, 0, 0));
      const event2 = new Event(date.setHours(22, 0, 0), event.endDate);

      let events = [event1, event2];
      return new EventForPay(events);
    } else {
      return false;
    }
  }
  // Si le lendemain
  else if (event.startDate.getDate() + 1 === event.endDate.getDate()) {
    // Si ça commence la journée le 1er jour et ça fini la nuit le deuxième
    if (isDayTime(event.startDate) && !isDayTime(event.endDate)) {
      const newEndDate = fullDateWithouthours(event.startDate);
      const newStartDate = fullDateWithouthours(event.endDate);

      const event1 = new Event(event.startDate, newEndDate.setHours(22, 0, 0));
      const event2 = new Event(newStartDate.setHours(22, 0, 0), event.endDate);

      let events = [event1, event2];
      return new EventForPay(events);
      // Si ça commence la nuit le 1er jour et ça fini la journée le deuxième
    } else if (!isDayTime(event.startDate) && isDayTime(event.endDate)) {
      const newEndDate = fullDateWithouthours(event.startDate);
      const newStartDate = fullDateWithouthours(event.endDate);

      const event1 = new Event(event.startDate, newEndDate.setHours(6, 0, 0));
      const event2 = new Event(newStartDate.setHours(6, 0, 0), event.endDate);

      let events = [event1, event2];
      return new EventForPay(events);
    } else {
      const newEndDate = fullDateWithouthours(event.startDate);
      const newStartDate = fullDateWithouthours(event.endDate);

      const event1 = new Event(event.startDate, newEndDate.setHours(22, 0, 0));
      const event2 = new Event(
        newEndDate.setHours(22, 0, 0),
        newStartDate.setHours(6, 0, 0)
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

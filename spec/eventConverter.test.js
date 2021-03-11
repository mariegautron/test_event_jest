const convertR = require("../eventConverter");
const Event = require("../Event");
const EventForPay = require("../EventForPay");

describe("tests convertEventToEventForPay", () => {
  // test("the event starts during the day ends during the day.", async () => {
  //   myevent = new Event( new Date("2021-03-10T08:00:00"), new Date("2021-03-10T15:00:00"));
  //   const response = convertR(myevent);
  //   expect(response instanceof EventForPay).toBe(true);
  //   expect(response.events.length).toBe(1);
  //   expect(response.events[0]).toBe(myevent);
  // });

  // test("the event starts during the night ends during the night.", async () => {
  //   myevent = new Event(
  //     new Date("2021-03-06T01:00:00"),
  //     new Date("2021-03-06T02:00:00")
  //   );
  //   const response = convertR(myevent);
  //   expect(response instanceof EventForPay).toBe(true);
  //   expect(response.events.length).toBe(1);
  //   expect(response.events[0]).toBe(myevent);
  // });

  // test("the event starts during the day ends during the night the same day.", async () => {
  //   myevent = new Event(
  //     new Date("2021-03-06T08:00:00"),
  //     new Date("2021-03-06T23:00:00")
  //   );
  //   const response = convertR(myevent);
  //   console.log(response);
  //   expect(response instanceof EventForPay).toBe(true);
  //   expect(response.events.length).toBe(2);
  //   // expect(response.events[0].startDate).toBe(myevent.startDate)
  //   // expect(response.events[0].endDate).toBe(myevent.startDate.setHours(21,59,59))
  //   // expect(response.events[1].startDate).toBe(myevent.startDate.setHours(22,0,0))
  //   // expect(response.events[1].endDate).toBe(myevent.endDate)
  // });

  test("the event starts day ends during the night.", async () => {
    myevent = new Event(
      new Date("2021-03-06T14:00:00"),
      new Date("2021-03-07T02:00:00")
    );
    const response = convertR(myevent);
    expect(response instanceof EventForPay).toBe(true);
    expect(response.events.length).toBe(2);
  });

  // test("the event starts during the night ends during the day.", async () => {
  //   myevent = new Event(
  //     new Date("2021-03-06T02:00:00"),
  //     new Date("2021-03-07T14:00:00")
  //   );
  //   const response = convertR(myevent);
  //   console.log(response);
  //   expect(response instanceof EventForPay).toBe(true);
  //   expect(response.events.length).toBe(2);
  // });

  // test(" the event starts during the day, continues during the night and ends during the day", async () => {
  //   myevent = new Event(
  //     new Date("2021-03-31T14:00:00"),
  //     new Date("2021-04-01T14:00:00")
  //   );
  //   const response = convertR(myevent);
  //   expect(response instanceof EventForPay).toBe(true);
  //   expect(response.events.length).toBe(3);
  // });
});

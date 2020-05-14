const { Event } = require("../classes/classes");

const obj = {
    title: "hjk hjk's voice lesson",
    id: "cb253a02-7f18-400f-a8b1-9559cf85a17b",
    start: "2020-04-06T14:30:00Z",
    end: "2020-04-06T15:00:00Z",
    backgroundColor: "null",
    borderColor: "null",
    instrument: "voice",
    icon: "/img/voice",
    rate: 6,
};

const lesson = new Event(obj);

test("properly create lesson", () => {
    expect(lesson).toEqual(obj);
});
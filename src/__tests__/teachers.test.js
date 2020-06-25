const { Teacher } = require("../classes/classes");
const obj = {
    _id: "1234",
    fname: "DEFAULT",
    lname: "DEFAULT",
    phone: "1234",
    lessons: [
        {
            title: "hjk hjk's voice lesson",
            id: "cb253a02-7f18-400f-a8b1-9559cf85a17b",
            start: "2020-04-06T14:30:00Z",
            end: "2020-04-06T15:00:00Z",
            backgroundColor: "null",
            borderColor: "null",
            instrument: "voice",
            icon: "/img/voice",
            rate: 6,
        },
    ],
    hours: [
        {
            daysOfWeek: ["0"],
            startTime: "00:00",
            endTime: "20:00",
        },
    ],
};
const guy = new Teacher(obj);
guy.trConv = 1;
guy.trFail = 0;
guy.nstu = 1;
test("test teacher js class", () => {
    expect(guy.getFullName()).toBe("DEFAULT DEFAULT");
});
test("properly return array of lessons in each month", () => {
    expect(guy.lessonsPerMonth()).toEqual([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
});
test("properly return trial conversion rate", () => {
    expect(guy.getConvRate()).toBe(100);
});
test("properly return lifetime gross income", () => {
    expect(guy.getGrossIncome()).toBe(14);
});
test("properly read availability, returning true", () => {
    expect(
        guy.checkAvailability({
            title: "hjk hjk's voice lesson",
            id: "cb253a02-7f18-400f-a8b1-9559cf85a17b",
            start: "2020-04-05T14:30:00Z",
            end: "2020-04-05T15:00:00Z",
            backgroundColor: "null",
            borderColor: "null",
            instrument: "voice",
            icon: "/img/voice",
            rate: 6,
        })
    ).toBe(true);
});
test("properly read availability, returning false from day", () => {
    expect(
        guy.checkAvailability({
            title: "hjk hjk's voice lesson",
            id: "cb253a02-7f18-400f-a8b1-9559cf85a17b",
            start: "2020-04-04T14:30:00Z",
            end: "2020-04-04T15:00:00Z",
            backgroundColor: "null",
            borderColor: "null",
            instrument: "voice",
            icon: "/img/voice",
            rate: 6,
        })
    ).toBe(false);
});
test("properly read availability, returning false from time", () => {
    expect(
        guy.checkAvailability({
            title: "hjk hjk's voice lesson",
            id: "cb253a02-7f18-400f-a8b1-9559cf85a17b",
            start: "2020-04-05T21:30:00Z",
            end: "2020-04-05T22:00:00Z",
            backgroundColor: "null",
            borderColor: "null",
            instrument: "voice",
            icon: "/img/voice",
            rate: 6,
        })
    ).toBe(false);
});
test("properly update and read availability, returning false", () => {
    const newHours = {
        daysOfWeek: ["1"],
        startTime: "00:00",
        endTime: "23:59",
    };
    expect(
        guy.changeAvailability(newHours).checkAvailability({
            title: "hjk hjk's voice lesson",
            id: "cb253a02-7f18-400f-a8b1-9559cf85a17b",
            start: "2020-04-06T14:30:00Z",
            end: "2020-04-06T15:00:00Z",
            backgroundColor: "null",
            borderColor: "null",
            instrument: "voice",
            icon: "/img/voice",
            rate: 6,
        })
    ).toBe(false);
});
test("properly return 0 income if no lessons in array", () => {
    const guy2 = new Teacher(obj);
    guy2.lessons = [];
    expect(guy2.getGrossIncome()).toEqual(0);
});

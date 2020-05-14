const { Student } = require("../classes/classes");

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
    instrument: 'Piano',
    hours: [
        {
            daysOfWeek: ["0"],
            startTime: "00:00",
            endTime: "23:59",
        },
    ],
    salary: 14,
};
const guy = new Student(obj);
test("test student js class", () => {
    expect(guy.getFullName()).toBe("DEFAULT DEFAULT");
});
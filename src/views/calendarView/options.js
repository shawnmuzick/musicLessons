const header = {
  left: "prev,next, today",
  center: "title",
  right: "dayGridMonth,timeGridWeek,timeGridDay"
};
const footer = {
  left: ""
};
const eSrc = {
  Brian: {
    lessons: [
      {
        groupId: "001",
        title: "Trumpet Lesson",
        daysOfWeek: [6],
        startRecur: "2019-11-02",
        startTime: "04:30:00",
        endTime: "05:00:00"
      }
    ]
  },
  Chrystal: {
    lessons: [
      {
        groupId: "001",
        daysOfWeek: [1],
        startRecur: "2019-11-04",
        title: "Piano Lesson",
        startTime: "04:30:00",
        endTime: "05:00:00"
      }
    ]
  },
  Jeff: {
    lessons: []
  },
  Shawn: {
    lessons: []
  }
};
export { header, footer, eSrc };

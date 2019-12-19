const header = {
  left: "prev,next, today",
  center: "title",
  right: "dayGridMonth,timeGridWeek,timeGridDay"
};
const footer = {
  center: ""
};
const businessHours = [
  {
    daysOfWeek: [1, 2, 3, 4, 5],
    startTime: "10:00",
    endTime: "20:00"
  },
  {
    daysOfWeek: [6],
    startTime: "10:00",
    endTime: "18:00"
  },
  {
    daysOfWeek: [0],
    startTime: "12:00",
    endTime: "17:00"
  }
]
export { header, footer, businessHours};

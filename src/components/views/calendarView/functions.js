import axios from "axios";

export const handler = (args, events, setEvents, calendarRef, teacher) => {
  //ENABLE THIS TO NAVIGATE ON DAY CLICK
  const api = calendarRef.current.getApi();

  if (api.view.type === "timeGridDay") {
    let title = window.prompt("Name this event: ");
    if (title === null) {
      return;
    }
    const newEvent = { title: title, start: args.dateStr };
    axios
      .post(`/api/teachers/${teacher}`, {
        lessons: events,
        newEvent: newEvent,
        teacher: teacher
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log("load" + error));

    setEvents([...events, newEvent]);
  } else {
    api.changeView("timeGridDay", args.dateStr);
  }
};
export const selector = (name, events, setTeacher, setEvents) => {
  setTeacher(name);
  setEvents(events);
};
export const drop = (edit, events, setEvents) => {
const id = edit.event.id;
console.log(id)
console.log(edit.event)
console.log(edit.event._instance)//path to times and such
  axios
    .put(`/api/update/${id}`, {
      update: edit.event._instance
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
export const arraytoobject = (array, setTeacher, setEvents, selector, footer) =>
  array.reduce((obj, item) => {
    obj[item.name] = item;
    item.text = item.name;
    item.click = function() {
      selector(item.text, item.lessons, setTeacher, setEvents);
    };
    footer.left += "," + item.text + " ";
    return obj;
  }, {});

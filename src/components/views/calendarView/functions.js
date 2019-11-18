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
      .post(`/api/newLesson/${teacher}`, {
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
export const selector = (name, events, setTeacher, setEvents, teacher) => {
  if (name === teacher) {
    return;
  }
  setTeacher(name);
  setEvents(events);
};
export const drop = edit => {
  const id = edit.event.id;
  axios
    .put(`/api/update/${id}`, {
      update: edit.event._instance
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
export const arraytoobject = (
  array,
  setTeacher,
  setEvents,
  footer,
  teacher
) => {
  let obj = array.reduce((obj, item) => {
    obj[item.name] = item;
    item.text = item.name;
    item.click = function() {
      selector(item.text, item.lessons, setTeacher, setEvents, teacher);
    };
    footer.left += "," + item.text + " ";
    return obj;
  }, {});
  obj.New = {};
  obj.New.text = "Add New";
  obj.New.click = function() {
    AddNewTeacher(setEvents);
  };
  footer.left += "," + obj.New.text;
  return obj;
};

export const AddNewTeacher = setEvents => {
  let name = window.prompt("Enter a name: ");
  let phone = window.prompt("Enter a phone number: ");
  axios
    .post(`/api/teachers`, { name, phone })
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err));
  setEvents('rerender');
};

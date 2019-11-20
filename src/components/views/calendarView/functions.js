import axios from "axios";

export const handler = (args, calendarRef, params, setParams) => {
  //ENABLE THIS TO NAVIGATE ON DAY CLICK
  const api = calendarRef.current.getApi();

  if (api.view.type === "timeGridDay") {
    let title = window.prompt("Name this event: ");
    if (title === null) {
      return;
    }
    const newEvent = { title: title, start: args.dateStr };
    axios
      .post(`/api/newLesson/${params.teacher}`, {
        lessons: params.events,
        newEvent: newEvent,
        teacher: params.teacher
      })
      .then(response => {
        newEvent.id = response.data.id;
      })
      .catch(error => console.log("load" + error));
    const events = [newEvent, ...params.events];
    setParams({
      teacher: params.teacher,
      events: events
    });
  } else {
    api.changeView("timeGridDay", args.dateStr);
  }
};
export const selector = (name, events, params, setParams) => {
  if (name === params.teacher) {
    return;
  }
  setParams({ teacher: name, events: events });
};
export const drop = (edit, params, setParams) => {
  const id = edit.event.id;
  console.log(edit.event);
  console.log(id);
  axios
    .put(`/api/update/${id}`, {
      update: edit.event._instance
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));

  setParams({ teacher: params.teacher, events: params.events });
};
export const makeButtons = (SRC, footer, params, setParams) => {
  let obj = SRC.reduce((obj, item) => {
    obj[item.name] = item;
    item.text = item.name;
    item.click = function() {
      selector(item.text, item.lessons, params, setParams);
    };
    footer.left += "," + item.text + " ";
    return obj;
  }, {});
  obj.New = {};
  obj.New.text = "Add New";
  obj.New.click = function() {
    AddNewTeacher(setParams);
  };
  footer.left += "," + obj.New.text;
  return obj;
};

export const AddNewTeacher = setParams => {
  let name = window.prompt("Enter a name: ");
  let phone = window.prompt("Enter a phone number: ");
  axios
    .post(`/api/teachers`, { name, phone })
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err));
  setParams({ teacher: "", events: [] });
};

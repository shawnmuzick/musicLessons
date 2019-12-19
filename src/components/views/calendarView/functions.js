import axios from "axios";

export const handler = (args, calendarRef, params, setParams) => {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const compare = args.view.context.options.businessHours;
  const eventDate = new Date(args.dateStr);
  const day = eventDate.getDay();
  const time =
    eventDate.getUTCHours() + ":" + addZero(eventDate.getUTCMinutes());
  let isAllowed = false;
  const allowed = () => {
    compare.forEach(item => {
      item.daysOfWeek.forEach(d => {
        if (d === day) {
          if (time >= item.startTime && time < item.endTime) {
            isAllowed = true;
          } else {
            window.alert(
              "The time you have selected is outside of our business hours!"
            );
          }
        }
      });
    });
  };
  //ENABLE THIS TO NAVIGATE ON DAY CLICK
  const api = calendarRef.current.getApi();

  if (api.view.type === "timeGridDay") {
    allowed();
    if (isAllowed === false) {
      return;
    } else {
      let title = window.prompt("Name this event: ");
      if (title === null) {
        return;
      }
      const newEvent = { title: title, start: args.dateStr };
      axios
        .post(`/api/newLesson/${params.teacher}`, {
          teacher: params.teacher,
          newEvent: newEvent
        })
        .catch(error => console.log("load" + error));
      axios
        .get(`/api/teachers/${params.teacher}`)
        .then(res => {
          setParams({
            teacher: res.data.name,
            events: res.data.lessons
          });
        })
        .catch(error => console.log("load" + error));
      api.changeView("dayGridMonth");
    }
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
  axios
    .put(`/api/update/`, {
      id: edit.event.id,
      update: edit.event._instance,
      name: params.teacher
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
    footer.center += "," + item.text + " ";
    return obj;
  }, {});
  obj.New = {};
  obj.New.text = "Add New";
  obj.New.click = function() {
    AddNewTeacher(setParams);
  };
  footer.center += "," + obj.New.text;
  return obj;
};

export const AddNewTeacher = setParams => {
  let name = window.prompt("Enter a name: ");
  if (name === null) {
    return;
  }
  let phone = window.prompt("Enter a phone number: ");
  if (phone === null) {
    return;
  }
  axios
    .post(`/api/teachers`, { name, phone })
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err));
  setParams({ teacher: "", events: [] });
};

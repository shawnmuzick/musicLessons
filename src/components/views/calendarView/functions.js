const handler = (args, events, setEvents, calendarRef) => {
    //ENABLE THIS TO NAVIGATE ON DAY CLICK
    const api = calendarRef.current.getApi();

    if (api.view.type === "timeGridDay") {
      let title = window.prompt("Name this event: ");
      if (title === null) {
        return;
      }
      const newEvent = { title: title, start: args.dateStr };
      setEvents([...events, newEvent]);
    } else {
      api.changeView("timeGridDay", args.dateStr);
    }
  };
  const selector = (name, events, setTeacher, setEvents) =>{
    setTeacher(name);
    setEvents(events);
  }
  export {
    handler,
    selector
  }
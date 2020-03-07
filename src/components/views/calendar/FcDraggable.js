import { Draggable } from "./plugins";
export default function FcDraggable() {
  let draggableEl = document.getElementById("extEvents");
  new Draggable(draggableEl, {
    itemSelector: ".fc-event",
    eventData: function(eventEl) {
      let title = eventEl.getAttribute("title");
      let _id = eventEl.getAttribute("id");
      let instrument = eventEl.getAttribute("instrument");
      let rate = eventEl.getAttribute("rate");
      return {
        allDay: false,
        title: title,
        _id: _id,
        instrument: instrument,
        rate: rate,
        // you need this parameter to avoid duplicates!!!
        create: false
      };
    }
  });
}

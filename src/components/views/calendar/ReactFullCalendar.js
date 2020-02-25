import React from 'react'
import { FullCalendar, plugins } from "./plugins";
import { eventClick, newDrop } from "./functions";

export default function ReactFullCalendar({calendarRef,teacher,setTeacher,makeButtons,header,footer}) {
    const changeView = (args, calendarRef) => {
        const api = calendarRef.current.getApi();
        if (api.view.type === "timeGridDay") {
          return;
        } else {
          api.changeView("timeGridDay", args.date);
        }
      };
      
    return (
        <FullCalendar
          customButtons={makeButtons()}
          dateClick={args => changeView(args, calendarRef)}
          eventClick={e => eventClick(e, teacher, setTeacher)}
          changeView={args => changeView(args, calendarRef)}
          eventDrop={edit => {console.log(edit); newDrop(edit, teacher, setTeacher, calendarRef)}}
          drop={edit => newDrop(edit, teacher, setTeacher, calendarRef)}
          eventResize={edit => newDrop(edit, teacher, setTeacher, calendarRef)}
          ref={calendarRef}
          footer={footer}
          header={header}
          plugins={plugins}
          events={teacher.lessons}
          droppable={true}
          businessHours={teacher.hours}
          eventLimit={3}
          eventDurationEditable={true}
          eventStartEditable={true}
          eventOverlap={false}
          editable={true}
          allDayDefault={false}
          minTime={"10:00:00"}
          maxTime={"22:00:00"}
          height={"parent"}
          timeZone={"UTC"}
          defaultTimedEventDuration={{ minutes: 30 }}
        />
    )
}

import React, { useEffect, useState } from "react";
import List from "./List";

export default function DailyView() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {}, [date]);

  const dateControl = e => {
    if (e.target.value === "-") {
      const newDate = new Date(date.setDate(date.getDate() - 1));
      setDate(newDate);
    } else {
      const newDate = new Date(date.setDate(date.getDate() + 1));
      setDate(newDate);
    }
  };
  let faculty = [
    {
      id: 1,
      name: "Brian",
      available: [
        null,
        ["1:00pm", "1:30pm", "2:00pm"],
        ["1:00pm", "1:30pm", "2:00pm"],
        ["1:00pm", "1:30pm", "2:00pm"],
        ["1:00pm", "1:30pm", "2:00pm"],
        null,
        ["1:00pm", "1:30pm", "2:00pm"]
      ]
    },
    {
      id: 2,
      name: "Chrystal",
      available: [
        null,
        ["6:30pm", "7:00pm", "7:30pm"],
        null,
        null,
        ["4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm"],
        null,
        null
      ]
    },
    {
      id: 3,
      name: "Donny",
      available: [
        null,
        null,
        [
          "1:00pm",
          "1:30pm",
          "2:00pm",
          "2:30pm",
          "3:00pm",
          "4:00pm",
          "4:30pm",
          "5:00pm",
          "5:30pm",
          "6:00pm"
        ],
        null,
        null,
        null,
        null
      ]
    },
    {
      id: 3,
      name: "Shawn",
      available: [
        null,
        ["5:00pm", "5:30pm"],
        null,
        [
          "4:00pm",
          "4:30pm",
          "5:00pm",
          "5:30pm",
          "6:00pm",
          "6:30pm",
          "7:00pm",
          "7:30pm"
        ],
        null,
        null,
        ["1:00pm", "1:30pm", "2:00pm", "2:30pm"]
      ]
    }
  ];
  let students = [
    {
      id: 1,
      name: "Matthew",
      teacher: "Shawn",
      lessonDay: 6,
      lessonTime: "2:30pm"
    },
    {
      id: 2,
      name: "Molly",
      teacher: "Brian",
      lessonDay: 6,
      lessonTime: "1:00pm"
    }
  ];
  return (
    <div id="DailyView" className={"view"}>
      <div id="dateControl">
        <button id="dateButton" onClick={dateControl} value={"-"}>
          -
        </button>
        <h2>Today: {date.toDateString()}</h2>
        <button id="dateButton" onClick={dateControl} value={"+"}>
          +
        </button>
      </div>

      {faculty.map(teacher => (
        <List
          students={students}
          key={teacher.id}
          date={date}
          name={teacher.name}
          availability={teacher.available}
        />
      ))}

    </div>
  );
}

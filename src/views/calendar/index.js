import React, { useEffect, useState, useMemo } from "react";
import { fetches, maps } from "../../util";
import { Header } from "../../components/";
import ReactFullCalendar from "./ReactFullCalendar";
import StuCont from "./stuCont";
import "./calendar.css";
export default function Calendar({ SRC, students, setStudents }) {
    const calendarRef = React.createRef();
    const [teacher, setTeacher] = useState({});
    const header = {
        left: "prev,next, today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
    };
    const footer = {}
    footer.center = useMemo(() => {
        console.log("usememo footer ran")
        let string = "";
        SRC.forEach((t) => {
            string += `${t.lname},`;
        });
        return string;
    }, [SRC]);

    useEffect(() => {
        //whenever the current teacher changes, rerender, fetch students, clean lessons array
        teacher.lessons = [];
        fetches
            .getStudents()
            .then((res) => setStudents(res))
            .catch((err) => console.log(err));
    }, [teacher, setStudents]);

    maps.addTeacherLessons(students, teacher);

    const makeButtons = useMemo(() => {
        console.log("usememo makebuttons ran");
        //This links students and their teachers
        let obj = SRC.reduce((obj, item) => {
            obj[item.lname] = item;
            item.click = function () {
                item.lessons = [];
                setTeacher(item);
            };
            return obj;
        }, {});
        return obj;
    }, [SRC]);
    
    return (
        <div className="view">
            <Header>
                <div className="calendarHeader">
                    {teacher._id ? (
                        <>
                            <img
                                src={`/assets/img/faculty/${teacher._id}.jpg`}
                                alt={`${teacher.fname} ${teacher.lname}`}
                            />
                            <h1>{`${teacher.fname} ${teacher.lname}`}</h1>
                        </>
                    ) : (
                        <>
                            <br />
                            <h1 style={{ margin: "auto" }}>Welcome</h1>
                        </>
                    )}
                </div>
            </Header>

            <div className="wrapper" id="CalendarWrap">
                <StuCont students={students} teacher={teacher} setTeacher={setTeacher} />
                <div className="spacer" />
                <ReactFullCalendar
                    calendarRef={calendarRef}
                    teacher={teacher}
                    setTeacher={setTeacher}
                    makeButtons={makeButtons}
                    header={header}
                    footer={footer}
                />
            </div>
        </div>
    );
}

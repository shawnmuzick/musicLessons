import React, { useEffect } from "react";
import EmpDetails from "./EmpDetails";
import { FrmNewTeacher } from "../../forms/";
import moment from "moment";
import { LesIns, LesMon, StuIns, TConvIns, Charts } from "../../charts";
import { Header, Modal } from "../../components/";
import { fetches } from "../../util/";
export default function DashboardView({ teachers, students }) {
    let arr = [];
    useEffect(() => {
        //clean lessons array on each render
        teachers.forEach((t) => {
            t.lessons = [];
            t.nStu = 0;
        });
    });

    for (let i = 0; i < 12; i++) {
        arr[i] = {
            name: moment().month(i).format("MMM"),
            value: 0,
        };
    }
    //link student lessons with teachers---------------------------------------
    students.forEach((s) => {
        teachers.forEach((t) => {
            if (t._id === s.teacher._id) {
                s.lessons.forEach((l) => {
                    t.lessons.push(l);
                });
                t.nStu++;
            }
        });
    });
    const getTotalLessons = () => {
        return students.reduce((total, s) => {
            return (total += s.lessons.length);
        }, 0);
    };
    const getTotalNetIncome = () => {
        return teachers.reduce((total, t) => {
            return (total += t.getGrossIncome());
        }, 0);
    };
    const getTotalGrossIncome = () => {
        return teachers.reduce((total, teacher) => {
            return (total += teacher.lessons.reduce((acc, lesson) => {
                return (acc += lesson.rate);
            }, 0));
        }, 0);
    };
    teachers.forEach((t) => {
        let arr2 = t.lessonsPerMonth();
        for (let i = 0; i < 12; i++) {
            arr[i].value += arr2[i];
        }
    });
    let conv = students.map((s) => {
        return s.trial.trConv;
    });
    let conversionRate = Math.round(
        (conv.reduce((x, y) => {
            return Number(x) + Number(y);
        }, 0) /
            conv.length) *
            100
    );
    const handleClick = (t, img) => {
        if (t.name === null || t.phone === null) return;
        t.img = img;
        fetches.postTeacher(t);
    };
    const renderEmployees = () => {
        return teachers.map((teacher) => <EmpDetails key={teacher._id} teacher={teacher} />);
    };
    console.log(getTotalNetIncome());
    return (
        <div className={"view"}>
            <Header>
                <h2>Dashboard</h2>
                <div className="dashHeader">
                    <h3>Total Lessons: {getTotalLessons()}</h3>
                    <h3>Total Students: {students.length}</h3>
                    <h3>Conversion Rate: {conversionRate}%</h3>
                    <h3>Gross Income: ${Math.round(getTotalGrossIncome() * 100) / 100}</h3>
                    <h3>
                        Profit: $
                        {Math.round((getTotalGrossIncome() - getTotalNetIncome()) * 100) / 100}
                    </h3>
                </div>
            </Header>
            <div className="wrapper">
                <Charts>
                    <LesIns arr={arr} teachers={teachers} students={students} />
                    <LesMon arr={arr} teachers={teachers} students={students} />
                    <StuIns arr={arr} teachers={teachers} students={students} />
                    <TConvIns arr={arr} teachers={teachers} students={students} />
                </Charts>
                <div className={"forms"}>
                    <h3>Faculty</h3>
                    {renderEmployees()}
                </div>
            </div>
            <Modal headerTxt={"Enter New Teacher"} btnTxt={"Enter New Teacher"} managed={true}>
                <FrmNewTeacher handleClick={handleClick} />
            </Modal>
        </div>
    );
}

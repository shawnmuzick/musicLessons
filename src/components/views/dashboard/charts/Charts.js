import React from 'react'
import LesIns from "./LesIns";
import LesMon from "./LesMon";
import StuIns from "./StuIns";
import TConvIns from './TConvIns';
export default function Charts({arr, teachers, students}) {
    return (
        <div className="metrics">
          <div className={"col"}>
            <div className={"colInn"}>
              <LesMon arr={arr} />
            </div>
          </div>
          <div className={"col"}>
            <div className={"colInn"}>
              <TConvIns students={students} teachers={teachers}/>
            </div>
          </div>
          <div className={"col"}>
            <div className={"colInn"}>
              <LesIns teachers={teachers} />
            </div>
          </div>
          <div className={"col"}>
            <div className={"colInn"}>
              <StuIns students={students} teachers={teachers} />
            </div>
          </div>
        </div>
    )
}

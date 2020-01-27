import React from 'react'
import LesIns from "./charts/LesIns";
import LesMon from "./charts/LesMon";
import StuIns from "./charts/StuIns";
import TConvIns from './charts/TConvIns';
export default function Metrics({arr, teachers, students}) {
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

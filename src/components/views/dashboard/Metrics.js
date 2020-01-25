import React from 'react'
import Les_Ins from "./charts/Les_Ins";
import Les_Mon from "./charts/Les_Mon";
import Stu_Ins from "./charts/Stu_Ins";

export default function Metrics({arr, teachers, students}) {
    return (
        <div className="metrics">
          <div className={"col"}>
            <div className={"colInn"}>
              <Les_Mon arr={arr} />
            </div>
          </div>
          <div className={"col"}>
            <div className={"colInn"}>
              <Les_Ins teachers={teachers} />
            </div>
          </div>
          <div className={"col"}>
            <div className={"colInn"}>
              <Stu_Ins students={students} teachers={teachers} />
            </div>
          </div>
        </div>
    )
}

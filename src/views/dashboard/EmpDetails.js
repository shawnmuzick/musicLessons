import React from "react";
import EmpHours from "./EmpHours";
import { Modal, ListContainer, ListItem } from "../../components/";
import { FrmDelete, FrmEditHours } from "../../forms/";
import { fetches } from "../../util/";
export default function EmpDetails({ teacher }) {
  return (
    <div className="formsWrap">
      <ListContainer>
        <details>
          <summary>
            <h4>{` ${teacher.fname} ${teacher.lname}`}</h4>
          </summary>
          <ListItem>
            <div className={"photoID"}>
              <img src={`/assets/img/faculty/${teacher._id}.jpg`} alt={`${teacher.fname}`} />
            </div>
            <div className="phone">
              <p>Phone: {teacher.phone}</p>
            </div>
            <div className="salary">
              <p>Salary: {`$${teacher.salary} per 1/2hr`}</p>
            </div>
            <EmpHours teacher={teacher} />
          </ListItem>

          <Modal managed={true} btnTxt={"Enter New Hours"} headerTxt={"Enter New Hours"}>
            <FrmEditHours teacher={teacher} />
          </Modal>
          <Modal managed={true} btnTxt={"Delete Instructor"} headerTxt={"Delete Instructor"}>
            <FrmDelete fname={teacher.fname} lname={teacher.lname} id={teacher._id} fn={fetches.deleteTeacherById} />
          </Modal>
        </details>
      </ListContainer>
    </div>
  );
}

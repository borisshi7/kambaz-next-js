"use client";
import { Button, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { LiaFileSignatureSolid } from "react-icons/lia";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentControls from "./assignmentsControls";
import ModuleControlButtons from "../modules/ModuleControlButtons";
import LessonControlButtons from "../modules/LessonControlButtons";
import GreenCheckmark from "../modules/GreenCheckmark";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
import { deleteAssignment, editAssignment } from "./reducer";
import { useState } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentReducer,
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );

  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string>("");

  return (
    <div>
      <AssignmentControls />
      <br />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3 text-success" />
            ASSIGNMENTS
            <span className="float-end">
              <span
                className="border rounded-pill border-dark px-2 py-2 me-2"
                style={{ fontSize: "0.8em" }}
              >
                40% of Total
              </span>
              <FaPlus className="me-2" />
              <IoEllipsisVertical className="fs-4" />
            </span>
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <ListGroupItem
                  className="wd-lesson p-3 ps-1"
                  key={assignment._id}
                >
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <LiaFileSignatureSolid className="me-2 fs-5 text-success" />
                    <div className="flex-grow-1">
                      <a
                        href={`/courses/${cid}/assignments/${assignment._id}`}
                        className="text-decoration-none text-dark fw-bold"
                      >
                        {assignment.title}
                      </a>
                      <br />
                      <span style={{ fontSize: "0.7em", color: "red" }}>
                        Multiple Modules
                      </span>
                      <span style={{ fontSize: "0.7em" }}>
                        {" "}
                        | Not available until {assignment.availableFromDate} |
                        Due {assignment.dueDateDate} | {assignment.score} pts
                      </span>
                    </div>
                    <div className="float-end">
                      {(currentUser?.role === "FACULTY" ||
                        currentUser?.role === "ADMIN") && (
                        <FaTrash
                          className="text-danger me-2 mb-1"
                          onClick={() => {
                            setAssignmentToDelete(assignment._id);
                            setShowDialog(true);
                          }}
                        />
                      )}
                      <Modal
                        show={showDialog}
                        onHide={() => setShowDialog(false)}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Are you sure you want to remove this assignment?
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={() => setShowDialog(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => {
                              dispatch(deleteAssignment(assignmentToDelete));
                              setShowDialog(false);
                            }}
                          >
                            Yes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                    <LessonControlButtons />
                  </div>
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}

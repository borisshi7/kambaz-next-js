"use client";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { LiaCalendarSolid, LiaTimesSolid } from "react-icons/lia";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
import { addAssignment, updateAssignment } from "../reducer";
import { useState } from "react";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentReducer,
  );
  const {currentUser} = useSelector(
    (state: RootState) => state.accountReducer,
  );
  
  const found =
    aid !== "new" ? assignments.find((a: any) => a._id === aid) : null;
  const [assignment, setAssignment] = useState(
    found || {
      title: "",
      description: "",
      score: "",
      course: cid,
      availableFromDate: "",
      dueDateDate: "",
    },
  );

  const dispatch = useDispatch();

  const router = useRouter();

  return (
    <div>
      <div id="wd-css-styling-forms">
        <Form.Label>Assignment Name</Form.Label>
        <Form.Control
          type="text"
          value={assignment?.title}
          readOnly={(currentUser as any)?.role !== "FACULTY"}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
        <br />
        <Form.Control
          as="textarea"
          rows={3}
          value={assignment?.description}
          readOnly={(currentUser as any)?.role !== "FACULTY"}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        />
        <br />
        <div id="wd-css-responsive-forms-1">
          <Row className="mb-3">
            <Form.Label column sm={2} className="text-end">
              Points
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={assignment?.score}
                readOnly={(currentUser as any)?.role !== "FACULTY"}
                onChange={(e) =>
                  setAssignment({ ...assignment, score: e.target.value })
                }
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label column sm={2} className="text-end">
              Assignment Group
            </Form.Label>
            <Col sm={10}>
              <Form.Select disabled={(currentUser as any)?.role !== "FACULTY"}>
                <option value="assignment">ASSIGNMENTS</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label column sm={2} className="text-end">
              Submission Type
            </Form.Label>
            <Col sm={10}>
              <div className="border rounded p-3 mb-3">
                <Form.Select disabled={(currentUser as any)?.role !== "FACULTY"}>
                  <option value="assignment">ONLINE</option>
                </Form.Select>
                <br />
                <Form.Label className="fw-bold">
                  Online Entry Options
                </Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Text Entry"
                  id="text-entry"
                  value="text-entry"
                  disabled={(currentUser as any)?.role !== "FACULTY"}
                />
                <br />
                <Form.Check
                  defaultChecked
                  type="checkbox"
                  label="Website URL"
                  id="website-url"
                  value="website-url"
                  disabled={(currentUser as any)?.role !== "FACULTY"}
                />
                <br />
                <Form.Check
                  type="checkbox"
                  label="Media Recording"
                  id="media-recording"
                  value="media-recording"
                  disabled={(currentUser as any)?.role !== "FACULTY"}
                />
                <br />
                <Form.Check
                  type="checkbox"
                  label="Student Annotation"
                  id="student-annotation"
                  value="student-annotation"
                  disabled={(currentUser as any)?.role !== "FACULTY"}
                />
                <br />
                <Form.Check
                  type="checkbox"
                  label="File Uploads"
                  id="file-uploads"
                  value="file-uploads"
                  disabled={(currentUser as any)?.role !== "FACULTY"}
                />
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label column sm={2} className="text-end">
              Assign
            </Form.Label>
            <Col sm={10}>
              <div className="border rounded p-3 mb-3">
                <Form.Label className="fw-bold">Assign To</Form.Label>
                <div className="border rounded p-1 d-flex align-items-center">
                  <span
                    className="bg-light rounded px-3 py-1 d-flex align-items-center"
                    style={{ fontSize: "0.9em" }}
                  >
                    Everyone
                    <LiaTimesSolid
                      className="ms-4"
                      style={{ cursor: "pointer" }}
                    />
                  </span>
                </div>
                <br />
                <Form.Label className="fw-bold">Due</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="datetime-local"
                    value={assignment?.dueDateDate}
                    readOnly={(currentUser as any)?.role !== "FACULTY"}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        dueDateDate: e.target.value,
                      })
                    }
                  />
                  <InputGroup.Text>
                    <LiaCalendarSolid />
                  </InputGroup.Text>
                </InputGroup>
                <br />
                <Row>
                  <Col sm={6}>
                    <Form.Label className="fw-bold">Available From</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="datetime-local"
                        value={assignment?.availableFromDate}
                        readOnly={(currentUser as any)?.role !== "FACULTY"}
                        onChange={(e) =>
                          setAssignment({
                            ...assignment,
                            availableFromDate: e.target.value,
                          })
                        }
                      />
                      <InputGroup.Text>
                        <LiaCalendarSolid />
                      </InputGroup.Text>
                    </InputGroup>
                  </Col>
                  <Col sm={6}>
                    <Form.Label className="fw-bold">Until</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="datetime-local"
                        value={assignment?.dueDateDate}
                        readOnly={(currentUser as any)?.role !== "FACULTY"}
                        onChange={(e) =>
                          setAssignment({
                            ...assignment,
                            dueDateDate: e.target.value,
                          })
                        }
                      />
                      <InputGroup.Text>
                        <LiaCalendarSolid />
                      </InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>

        <hr />
        <div className="text-end">
          <Link
            href={`/courses/${cid}/assignments`}
            className="btn border btn-light me-1"
          >
            Cancel
          </Link>
          <Button
            className="btn btn-danger"
            onClick={() => {
              if (aid === "new") {
                dispatch(addAssignment({ ...assignment, course: cid }));
              } else {
                dispatch(updateAssignment(assignment));
              }
              router.push(`/courses/${cid}/assignments`);
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

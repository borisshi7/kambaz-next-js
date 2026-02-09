"use client";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { LiaCalendarSolid, LiaTimesSolid } from "react-icons/lia";
export default function AssignmentEditor() {
  return (
    <div>
      <div id="wd-css-styling-forms">
        <Form.Label>Assignment Name</Form.Label>
        <Form.Control type="text" defaultValue="A1" />
        <br />
        <div className="border rounded p-3 mb-3">
          <p>
            This assignment is
            <span className="text-danger">available online</span>
          </p>
          <p>
            Submit a link to the landing page of your web application running on
            Netlify.
          </p>
          <p>The landing page should include the following:</p>
          <ul>
            <li>Your full name and section</li>
            <li>Links to each of the lab assignments</li>
            <li>A link to the Kanbas application</li>
            <li>Links to all relevant source code repositories</li>
          </ul>
          <p>
            The Kanbas application should include a link to navigate back to the
            landing page.
          </p>
        </div>

        <div id="wd-css-responsive-forms-1">
          <Row className="mb-3">
            <Form.Label column sm={2} className="text-end">
              Points
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" defaultValue="100" />
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label column sm={2} className="text-end">
              Assignment Group
            </Form.Label>
            <Col sm={10}>
              <Form.Select>
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
                <Form.Select>
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
                />
                <br />
                <Form.Check
                  checked
                  type="checkbox"
                  label="Website URL"
                  id="website-url"
                  value="website-url"
                />
                <br />
                <Form.Check
                  type="checkbox"
                  label="Media Recording"
                  id="media-recording"
                  value="media-recording"
                />
                <br />
                <Form.Check
                  type="checkbox"
                  label="Student Annotation"
                  id="student-annotation"
                  value="student-annotation"
                />
                <br />
                <Form.Check
                  type="checkbox"
                  label="File Uploads"
                  id="file-uploads"
                  value="file-uploads"
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
                    defaultValue="2024-05-13T23:59"
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
                        defaultValue="2024-05-6T12:00"
                      />
                      <InputGroup.Text>
                        <LiaCalendarSolid />
                      </InputGroup.Text>
                    </InputGroup>
                  </Col>
                  <Col sm={6}>
                    <Form.Label className="fw-bold">Until</Form.Label>
                    <InputGroup>
                      <Form.Control type="datetime-local" />
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
          <a
            href="/courses/1234/assignments"
            className="btn border btn-light me-1"
          >
            Cancel
          </a>
          <a href="/courses/1234/assignments" className="btn btn-danger">
            Save
          </a>
        </div>
      </div>
    </div>
  );
}

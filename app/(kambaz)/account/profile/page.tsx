"use client";
import Link from "next/link";
import { LiaCalendarSolid } from "react-icons/lia";
import { Form, InputGroup, Row, Col } from "react-bootstrap";
export default function Profile() {
  return (
    <div id="wd-css-styling-forms" className="">
      <h2>Profile</h2>
      <div>
        <Row>
          <Col xs={4}>
            <Form.Control type="text" className="mb-2" defaultValue="alice" />
            <Form.Control type="text" className="mb-2" defaultValue="alice" />
            <Form.Control type="password" className="mb-2" defaultValue="123" />
            <Form.Control type="text" className="mb-2" defaultValue="Alice" />
            <InputGroup>
              <Form.Control
                type="datetime-local"
                className="mb-2"
                defaultValue="2024-05-13T23:59"
              />
              <InputGroup.Text>
                <LiaCalendarSolid />
              </InputGroup.Text>
            </InputGroup>
            <Form.Control type="email" className="mb-2" defaultValue="alice@wonderland.com" />
            <Form.Control type="text" className="mb-2" defaultValue="User" />
            <a
              href="/account/signin"
              className="btn border d-grid btn-danger"
            >
              Cancel
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
}

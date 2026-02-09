"use client";
import Link from "next/link";
import { LiaCalendarSolid } from "react-icons/lia";
import { Form, InputGroup, Row, Col } from "react-bootstrap";
export default function Signup() {
  return (
    <div id="wd-css-styling-forms">
      <h2>Sign Up</h2>
      <div>
        <Row>
          <Col xs={4}>
            <Form.Control type="text" className="mb-2" placeholder="username" />
            <Form.Control type="password" className="mb-2" placeholder="password" />
            <a
              href="/dashboard"
              className="btn border d-grid btn-primary mb-2"
            >
              Signup
            </a>
          </Col>
        </Row>
        <Link href="signin"> Sign In </Link>
      </div>
    </div>
  );
}

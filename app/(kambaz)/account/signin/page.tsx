"use client";
import Link from "next/link";
import { LiaCalendarSolid } from "react-icons/lia";
import { Form, InputGroup, Row, Col } from "react-bootstrap";
export default function Signin() {
  return (
    <div id="wd-css-styling-forms">
      <h2>Sign In</h2>
      <div>
        <Row>
          <Col xs={4}>
            <Form.Control type="text" className="mb-2" placeholder="username" />
            <Form.Control type="password" className="mb-2" placeholder="password" />
            <a
              href="/account/profile"
              className="btn border d-grid btn-primary mb-2"
            >
              Signin
            </a>
          </Col>
        </Row>
        <Link href="signup"> Sign Up </Link>
      </div>
    </div>
  );
}

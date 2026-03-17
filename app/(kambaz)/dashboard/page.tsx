"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
  setCourses,
} from "../courses/[cid]/reducer";
import { RootState } from "../store";

import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { enroll, unenroll } from "./enrollReducer";
export default function Dashboard() {
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollReducer,
  );
  const [showAllCourses, setShowAllCourses] = useState(false);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard
        <button
          className="btn btn-primary float-end"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          Enrollments
        </button>
      </h1>
      <hr />
      {(currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN") && (
        <h5>
          New Course
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={() => dispatch(addNewCourse(course))}
          >
            Add
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={() => dispatch(updateCourse(course))}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>
      )}
      <br />
      {(currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN") && (
        <>
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </>
      )}
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .filter(
              (course) =>
                showAllCourses ||
                enrollments.some(
                  (e: any) =>
                    e.user === currentUser?._id && e.course === course._id,
                ),
            )
            .map((course) => (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    href={`/courses/${course._id}/home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      src="/images/reactjs.png"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <CardBody className="card-body">
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </CardText>
                      <Button
                        variant="primary"
                        onClick={(event) => {
                          const isEnrolled = enrollments.some(
                            (e: any) =>
                              e.user === currentUser?._id &&
                              e.course === course._id,
                          );
                          if (!isEnrolled) {
                            event.preventDefault();
                          }
                        }}
                      >
                        Go
                      </Button>
                      {(currentUser?.role === "FACULTY" ||
                        currentUser?.role === "ADMIN") && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(deleteCourse(course._id));
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
                      {enrollments.some(
                        (e: any) =>
                          e.user === currentUser?._id &&
                          e.course === course._id,
                      ) ? (
                        <Button
                          variant="danger"
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(
                              unenroll({
                                user: currentUser?._id,
                                course: course._id,
                              }),
                            );
                          }}
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(
                              enroll({
                                user: currentUser?._id,
                                course: course._id,
                              }),
                            );
                          }}
                        >
                          Enroll
                        </Button>
                      )}
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

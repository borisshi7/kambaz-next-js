"use client";
import { Button, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { LiaFileSignatureSolid } from "react-icons/lia";
import {
  FaPlus,
  FaTrash,
  FaCaretDown,
  FaCheck,
  FaXmark,
} from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import LessonControlButtons from "../modules/LessonControlButtons";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
import { setQuizzes } from "./reducer";
import { useEffect, useState } from "react";
import * as client from "../../client";
import QuizzesControl from "./quizControl";

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: RootState) => state.quizReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );

  const dispatch = useDispatch();
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const [showDialog, setShowDialog] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<string>("");

  const fetchQuizzes = async () => {
    const data = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(data));
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const onRemoveQuiz = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    dispatch(setQuizzes(quizzes.filter((q: any) => q._id !== quizId)));
  };

  const totalPoints = (quiz: any) =>
    quiz.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) ||
    0;

  const availability = (quiz: any) => {
    const now = new Date();
    if (quiz.availableDate && now < new Date(quiz.availableDate))
      return `Not available until ${new Date(quiz.availableDate).toLocaleDateString()}`;
    if (quiz.untilDate && now > new Date(quiz.untilDate)) return "Closed";
    return "Available";
  };

  return (
    <div>
      <QuizzesControl />
      <br />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <FaCaretDown className="me-2 fs-3" />
            Assignment Quizzes
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {quizzes
              .filter((quiz: any) => quiz.course === cid)
              .filter((quiz: any) => isFaculty || quiz.published)
              .sort((a: any, b: any) => new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime())
              .map((quiz: any) => (
                <ListGroupItem className="wd-lesson p-3 ps-1" key={quiz._id}>
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <LiaFileSignatureSolid className="me-2 fs-5 text-success" />
                    <div className="flex-grow-1">
                      <Link
                        href={`/courses/${cid}/quizzes/${quiz._id}`}
                        className="text-decoration-none text-dark fw-bold"
                      >
                        {quiz.title}
                      </Link>
                      <br />
                      <span style={{ fontSize: "0.7em" }}>
                        {availability(quiz)}
                        {" | "}
                        Due{" "}
                        {quiz.dueDate
                          ? new Date(quiz.dueDate).toLocaleDateString()
                          : "N/A"}
                        {" | "}
                        {totalPoints(quiz)} pts
                        {" | "}
                        {quiz.questions?.length || 0} questions
                      </span>
                    </div>
                    <div className="float-end">
                      {(currentUser?.role === "FACULTY" ||
                        currentUser?.role === "ADMIN") && (
                        <FaTrash
                          className="text-danger me-2 mb-1"
                          onClick={() => {
                            setQuizToDelete(quiz._id);
                            setShowDialog(true);
                          }}
                        />
                      )}
                    </div>
                    {isFaculty && (quiz.published ? (
                      <span className="text-success">
                        <FaCheck
                          onClick={async () => {
                            const updated = {
                              ...quiz,
                              published: !quiz.published,
                            };
                            await client.updateQuiz(updated);
                            dispatch(
                              setQuizzes(
                                quizzes.map((q: any) =>
                                  q._id === quiz._id ? updated : q,
                                ),
                              ),
                            );
                          }}
                        />
                      </span>
                    ) : (
                      <span className="text-danger">
                        <FaXmark
                          onClick={async () => {
                            const updated = {
                              ...quiz,
                              published: !quiz.published,
                            };
                            await client.updateQuiz(updated);
                            dispatch(
                              setQuizzes(
                                quizzes.map((q: any) =>
                                  q._id === quiz._id ? updated : q,
                                ),
                              ),
                            );
                          }}
                        />
                      </span>
                    ))}
                  </div>
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>

      <Modal show={showDialog} onHide={() => setShowDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this quiz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onRemoveQuiz(quizToDelete);
              setShowDialog(false);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

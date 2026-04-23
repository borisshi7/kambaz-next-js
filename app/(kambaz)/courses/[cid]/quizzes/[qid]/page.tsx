"use client";
import { Nav, NavItem, NavLink, Button } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
import { setQuizzes } from "../reducer";
import { useState } from "react";
import * as client from "../../../client";
import QuizDetail from "./quizDetail";
import QuizEditor from "./quizEditor";
import StudentQuizView from "./quizStudentView";

export default function QuizEditorPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const found = qid !== "new"
    ? quizzes.find((q: any) => q._id === qid)
    : null;

  const [quiz, setQuiz] = useState<any>(
    found || {
      title: "Unnamed Quiz",
      description: "",
      quizType: "Graded Quiz",
      assignmentGroup: "Quizzes",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      howManyAttempts: 1,
      showCorrectAnswers: "Immediately",
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      dueDate: "",
      availableDate: "",
      untilDate: "",
      published: false,
      questions: [],
      course: cid,
    },
  );

  // "details" = read-only summary, "edit" = editor tabs, "preview" = student view
  const [mode, setMode] = useState(qid === "new" ? "edit" : "details");
  const [activeTab, setActiveTab] = useState("details");

  const onSave = async () => {
    if (qid === "new") {
      const created = await client.createQuizForCourse(cid as string, quiz);
      dispatch(setQuizzes([...quizzes, created]));
    } else {
      await client.updateQuiz(quiz);
      dispatch(
        setQuizzes(quizzes.map((q: any) => (q._id === quiz._id ? quiz : q))),
      );
    }
    router.push(`/courses/${cid}/quizzes`);
  };

  // Student: always show quiz view
  if (!isFaculty && qid !== "new") {
    return <StudentQuizView quiz={quiz} />;
  }

  // Faculty: preview mode
  if (mode === "preview") {
    return (
      <div>
        <StudentQuizView quiz={quiz} isPreview />
        <hr />
        <Button variant="secondary" onClick={() => setMode("details")}>
          Back to Details
        </Button>
      </div>
    );
  }

  // Faculty: read-only details
  if (mode === "details") {
    return (
      <div>
        <QuizDetail quiz={quiz} setQuiz={setQuiz} edit={false} />
        <hr />
        <div className="text-end">
          <Button variant="secondary" className="me-2" onClick={() => setMode("preview")}>
            Preview
          </Button>
          <Button variant="danger" onClick={() => setMode("edit")}>
            Edit
          </Button>
        </div>
      </div>
    );
  }

  // Faculty: edit mode with tabs
  return (
    <div>
      <Nav variant="tabs" className="mb-3">
        <NavItem>
          <NavLink
            active={activeTab === "details"}
            onClick={() => setActiveTab("details")}
            style={{ cursor: "pointer" }}
          >
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={activeTab === "questions"}
            onClick={() => setActiveTab("questions")}
            style={{ cursor: "pointer" }}
          >
            Questions
          </NavLink>
        </NavItem>
      </Nav>

      {activeTab === "details" && <QuizDetail quiz={quiz} setQuiz={setQuiz} edit={true} />}
      {activeTab === "questions" && <QuizEditor quiz={quiz} setQuiz={setQuiz} />}

      <hr />
      <div className="text-end">
        <Button
          variant="light"
          className="me-2 border"
          onClick={() => router.push(`/courses/${cid}/quizzes`)}
        >
          Cancel
        </Button>
        <Button variant="secondary" className="me-2" onClick={() => setMode("preview")}>
          Preview
        </Button>
        <Button variant="danger" className="me-2" onClick={onSave}>
          Save
        </Button>
        <Button variant="success" onClick={async () => {
          const updated = { ...quiz, published: true };
          setQuiz(updated);
          if (qid === "new") {
            const created = await client.createQuizForCourse(cid as string, updated);
            dispatch(setQuizzes([...quizzes, created]));
          } else {
            await client.updateQuiz(updated);
            dispatch(setQuizzes(quizzes.map((q: any) => (q._id === updated._id ? updated : q))));
          }
          router.push(`/courses/${cid}/quizzes`);
        }}>
          Save & Publish
        </Button>
      </div>
    </div>
  );
}

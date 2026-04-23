"use client";
import { Form, Row, Col } from "react-bootstrap";

export default function QuizDetail({
  quiz,
  setQuiz,
  edit = true,
}: {
  quiz: any;
  setQuiz: (q: any) => void;
  edit?: boolean;
}) {
  return (
    <div>
      <Form.Label>Title</Form.Label>
      <Form.Control
        type="text"
        value={quiz.title}
        disabled={!edit}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
      />
      <br />
      <Form.Label>Description</Form.Label>
      <Form.Control
        as="textarea"
        rows={4}
        value={quiz.description}
        disabled={!edit}
        onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
      />
      <br />
      <Row className="mb-3">
        <Form.Label column sm={3}>Quiz Type</Form.Label>
        <Col sm={9}>
          <Form.Select
            value={quiz.quizType}
            disabled={!edit}
            onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
          >
            <option>Graded Quiz</option>
            <option>Practice Quiz</option>
            <option>Graded Survey</option>
            <option>Ungraded Survey</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Label column sm={3}>Assignment Group</Form.Label>
        <Col sm={9}>
          <Form.Select
            value={quiz.assignmentGroup}
            disabled={!edit}
            onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
          >
            <option>Quizzes</option>
            <option>Exams</option>
            <option>Assignments</option>
            <option>Project</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Label column sm={3}>Time Limit (minutes)</Form.Label>
        <Col sm={9}>
          <Form.Control
            type="number"
            value={quiz.timeLimit}
            disabled={!edit}
            onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Label column sm={3}>Shuffle Answers</Form.Label>
        <Col sm={9}>
          <Form.Check
            type="checkbox"
            checked={quiz.shuffleAnswers}
            disabled={!edit}
            onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Label column sm={3}>Multiple Attempts</Form.Label>
        <Col sm={9}>
          <Form.Check
            type="checkbox"
            checked={quiz.multipleAttempts}
            disabled={!edit}
            onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
          />
        </Col>
      </Row>
      {quiz.multipleAttempts && (
        <Row className="mb-3">
          <Form.Label column sm={3}>How Many Attempts</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              value={quiz.howManyAttempts}
              disabled={!edit}
              onChange={(e) => setQuiz({ ...quiz, howManyAttempts: parseInt(e.target.value) })}
            />
          </Col>
        </Row>
      )}
      <Row className="mb-3">
        <Form.Label column sm={3}>Access Code</Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            value={quiz.accessCode}
            disabled={!edit}
            onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Label column sm={3}>Due Date</Form.Label>
        <Col sm={9}>
          <Form.Control
            type="datetime-local"
            value={quiz.dueDate ? quiz.dueDate.slice(0, 16) : ""}
            disabled={!edit}
            onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Label column sm={3}>Available Date</Form.Label>
        <Col sm={9}>
          <Form.Control
            type="datetime-local"
            value={quiz.availableDate ? quiz.availableDate.slice(0, 16) : ""}
            disabled={!edit}
            onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Label column sm={3}>Until Date</Form.Label>
        <Col sm={9}>
          <Form.Control
            type="datetime-local"
            value={quiz.untilDate ? quiz.untilDate.slice(0, 16) : ""}
            disabled={!edit}
            onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
          />
        </Col>
      </Row>
    </div>
  );
}

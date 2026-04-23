"use client";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";

export default function QuizEditor({
  quiz,
  setQuiz,
}: {
  quiz: any;
  setQuiz: (q: any) => void;
}) {
  const questions = quiz.questions || [];

  const addQuestion = () => {
    const newQ = {
      _id: uuidv4(),
      title: `Question ${questions.length + 1}`,
      type: "MULTIPLE_CHOICE",
      points: 10,
      question: "",
      choices: [{ text: "", isCorrect: true }],
      correctAnswer: true,
      possibleAnswers: [""],
    };
    setQuiz({ ...quiz, questions: [...questions, newQ] });
  };

  const updateQuestion = (qid: string, updates: any) => {
    setQuiz({
      ...quiz,
      questions: questions.map((q: any) =>
        q._id === qid ? { ...q, ...updates } : q,
      ),
    });
  };

  const removeQuestion = (qid: string) => {
    setQuiz({
      ...quiz,
      questions: questions.filter((q: any) => q._id !== qid),
    });
  };

  const totalPoints = questions.reduce(
    (sum: number, q: any) => sum + (q.points || 0), 0,
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Questions ({questions.length}) — {totalPoints} pts</h5>
        <Button variant="outline-danger" onClick={addQuestion}>
          <FaPlus className="me-2" />
          New Question
        </Button>
      </div>
      {questions.map((q: any, idx: number) => (
        <Card key={q._id} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between mb-2">
              <h6>Question {idx + 1}</h6>
              <FaTrash
                className="text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => removeQuestion(q._id)}
              />
            </div>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value={q.title}
                  onChange={(e) => updateQuestion(q._id, { title: e.target.value })}
                />
              </Col>
              <Col sm={4}>
                <Form.Select
                  value={q.type}
                  onChange={(e) => updateQuestion(q._id, { type: e.target.value })}
                >
                  <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                  <option value="TRUE_FALSE">True/False</option>
                  <option value="FILL_IN_BLANK">Fill in the Blank</option>
                </Form.Select>
              </Col>
              <Col sm={4}>
                <Form.Control
                  type="number"
                  placeholder="Points"
                  value={q.points}
                  onChange={(e) => updateQuestion(q._id, { points: parseInt(e.target.value) || 0 })}
                />
              </Col>
            </Row>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Question text"
              className="mb-3"
              value={q.question}
              onChange={(e) => updateQuestion(q._id, { question: e.target.value })}
            />

            {/* Multiple Choice */}
            {q.type === "MULTIPLE_CHOICE" && (
              <div>
                <Form.Label className="fw-bold">Choices</Form.Label>
                {(q.choices || []).map((c: any, ci: number) => (
                  <div key={ci} className="d-flex align-items-center mb-2">
                    <Form.Check
                      type="radio"
                      name={`correct-${q._id}`}
                      checked={c.isCorrect}
                      className="me-2"
                      onChange={() => {
                        const newChoices = q.choices.map((ch: any, i: number) => ({
                          ...ch,
                          isCorrect: i === ci,
                        }));
                        updateQuestion(q._id, { choices: newChoices });
                      }}
                    />
                    <Form.Control
                      type="text"
                      value={c.text}
                      className="me-2"
                      onChange={(e) => {
                        const newChoices = [...q.choices];
                        newChoices[ci] = { ...newChoices[ci], text: e.target.value };
                        updateQuestion(q._id, { choices: newChoices });
                      }}
                    />
                    <FaTrash
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const newChoices = q.choices.filter((_: any, i: number) => i !== ci);
                        updateQuestion(q._id, { choices: newChoices });
                      }}
                    />
                  </div>
                ))}
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => {
                    updateQuestion(q._id, {
                      choices: [...(q.choices || []), { text: "", isCorrect: false }],
                    });
                  }}
                >
                  <FaPlus className="me-1" /> Add Another Answer
                </Button>
              </div>
            )}

            {/* True/False */}
            {q.type === "TRUE_FALSE" && (
              <div>
                <Form.Label className="fw-bold">Correct Answer</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    label="True"
                    name={`tf-${q._id}`}
                    checked={q.correctAnswer === true}
                    onChange={() => updateQuestion(q._id, { correctAnswer: true })}
                  />
                  <Form.Check
                    type="radio"
                    label="False"
                    name={`tf-${q._id}`}
                    checked={q.correctAnswer === false}
                    onChange={() => updateQuestion(q._id, { correctAnswer: false })}
                  />
                </div>
              </div>
            )}

            {/* Fill in the Blank */}
            {q.type === "FILL_IN_BLANK" && (
              <div>
                <Form.Label className="fw-bold">Possible Answers</Form.Label>
                {(q.possibleAnswers || []).map((a: string, ai: number) => (
                  <div key={ai} className="d-flex align-items-center mb-2">
                    <Form.Control
                      type="text"
                      value={a}
                      className="me-2"
                      onChange={(e) => {
                        const newAnswers = [...q.possibleAnswers];
                        newAnswers[ai] = e.target.value;
                        updateQuestion(q._id, { possibleAnswers: newAnswers });
                      }}
                    />
                    <FaTrash
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const newAnswers = q.possibleAnswers.filter(
                          (_: any, i: number) => i !== ai,
                        );
                        updateQuestion(q._id, { possibleAnswers: newAnswers });
                      }}
                    />
                  </div>
                ))}
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => {
                    updateQuestion(q._id, {
                      possibleAnswers: [...(q.possibleAnswers || []), ""],
                    });
                  }}
                >
                  <FaPlus className="me-1" /> Add Another Answer
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

"use client";
import { RootState } from "@/app/(kambaz)/store";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as client from "../../../client";

export default function StudentQuizView({ quiz, isPreview = false }: { quiz: any; isPreview?: boolean }) {
  const { cid } = useParams();
  const router = useRouter();
  const questions = quiz.questions || [];
  const [shuffledChoices] = useState<Record<string, any[]>>(() => {
    if (!quiz.shuffleAnswers) return {};
    const map: Record<string, any[]> = {};
    for (const q of questions) {
      if (q.type === "MULTIPLE_CHOICE" && q.choices) {
        map[q._id] = [...q.choices].sort(() => Math.random() - 0.5);
      }
    }
    return map;
  });
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [attemptsUsed, setAttemptsUsed] = useState(0);

  useEffect(() => {
    if (!isPreview && quiz._id && currentUser?._id) {
      client.getAttempts(quiz._id, currentUser._id).then((attempts: any[]) => {
        if (attempts.length > 0) {
          const last = attempts[0];
          const restored: Record<string, any> = {};
          for (const a of last.answers) {
            restored[a.questionId] = a.answer;
          }
          setAnswers(restored);
          setResult(last);
          setSubmitted(true);
          setAttemptsUsed(attempts.length);
        }
      });
    }
  }, []);

  const updateAnswer = (questionId: string, value: any) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const totalPoints = questions.reduce(
    (sum: number, q: any) => sum + (q.points || 0),
    0,
  );

  const submit = async () => {
    const formatted = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));
    try {
      if (isPreview) {
        let score = 0;
        for (const a of formatted) {
          const q = questions.find((q: any) => q._id === a.questionId);
          if (!q) continue;
          if (q.type === "MULTIPLE_CHOICE") {
            const correct = q.choices?.find((c: any) => c.isCorrect);
            if (correct && a.answer === correct.text) score += q.points;
          } else if (q.type === "TRUE_FALSE") {
            if (a.answer === q.correctAnswer) score += q.points;
          } else if (q.type === "FILL_IN_BLANK") {
            if (q.possibleAnswers?.some((pa: string) => pa.toLowerCase() === String(a.answer).toLowerCase())) score += q.points;
          }
        }
        setResult({ score });
      } else {
        const attempt = await client.submitAttempt(
          quiz._id,
          currentUser._id,
          formatted,
        );
        setResult(attempt);
        setAttemptsUsed(attemptsUsed + 1);
      }
      setSubmitted(true);
    } catch (e: any) {
      alert(e.response?.data?.error || "Failed to submit");
    }
  };

  if (submitted && result) {
    return (
      <div>
        <h3>{quiz.title} — Results</h3>
        <h4>
          Score: {result.score} / {totalPoints}
        </h4>
        <hr />
        {questions.map((q: any, idx: number) => {
          const userAnswer = answers[q._id];
          let isCorrect = false;
          if (q.type === "MULTIPLE_CHOICE") {
            const correct = q.choices?.find((c: any) => c.isCorrect);
            isCorrect = correct && userAnswer === correct.text;
          } else if (q.type === "TRUE_FALSE") {
            isCorrect = userAnswer === q.correctAnswer;
          } else if (q.type === "FILL_IN_BLANK") {
            isCorrect = q.possibleAnswers?.some(
              (pa: string) =>
                pa.toLowerCase() === String(userAnswer).toLowerCase(),
            );
          }
          return (
            <Card
              key={q._id}
              className={`mb-3 border-${isCorrect ? "success" : "danger"}`}
            >
              <Card.Body>
                <h6>
                  {isCorrect ? (
                    <FaCheck className="text-success" />
                  ) : (
                    <FaXmark className="text-danger" />
                  )}{" "}
                  Question {idx + 1}: {q.title} ({q.points} pts)
                </h6>
                <p>{q.question}</p>
                <p>
                  Your answer: <strong>{String(userAnswer)}</strong>
                </p>
              </Card.Body>
            </Card>
          );
        })}
        <Button
          variant="light"
          className="border me-2"
          onClick={() => router.push(`/courses/${cid}/quizzes`)}
        >
          Back to Quizzes
        </Button>
        {!isPreview && quiz.multipleAttempts && attemptsUsed < quiz.howManyAttempts && (
          <Button
            variant="danger"
            onClick={() => {
              setSubmitted(false);
              setResult(null);
              setAnswers({});
            }}
          >
            Retake Quiz ({quiz.howManyAttempts - attemptsUsed} attempts remaining)
          </Button>
        )}
      </div>
    );
  }

  return (
    <div>
      <h3>{quiz.title}</h3>
      <p>{quiz.description}</p>
      <p>
        Total: {totalPoints} pts | {questions.length} questions
      </p>
      <hr />
      {questions.map((q: any, idx: number) => (
        <Card key={q._id} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between mb-2">
              <h6>
                Question {idx + 1}: {q.title}
              </h6>
              <span>{q.points} pts</span>
            </div>
            <p>{q.question}</p>

            {q.type === "MULTIPLE_CHOICE" && (
              <div>
                {(shuffledChoices[q._id] || q.choices || []).map((c: any, ci: number) => (
                  <Form.Check
                    key={ci}
                    type="radio"
                    label={c.text}
                    name={`q-${q._id}`}
                    className="mb-2"
                    checked={answers[q._id] === c.text}
                    onChange={() => updateAnswer(q._id, c.text)}
                  />
                ))}
              </div>
            )}

            {q.type === "TRUE_FALSE" && (
              <div>
                <Form.Check
                  type="radio"
                  label="True"
                  name={`q-${q._id}`}
                  className="mb-2"
                  checked={answers[q._id] === true}
                  onChange={() => updateAnswer(q._id, true)}
                />
                <Form.Check
                  type="radio"
                  label="False"
                  name={`q-${q._id}`}
                  className="mb-2"
                  checked={answers[q._id] === false}
                  onChange={() => updateAnswer(q._id, false)}
                />
              </div>
            )}

            {q.type === "FILL_IN_BLANK" && (
              <Form.Control
                type="text"
                placeholder="Type your answer"
                value={answers[q._id] || ""}
                onChange={(e) => updateAnswer(q._id, e.target.value)}
              />
            )}
          </Card.Body>
        </Card>
      ))}

      <hr />
      <div className="text-end">
        <Button
          variant="light"
          className="me-2 border"
          onClick={() => router.push(`/courses/${cid}/quizzes`)}
        >
          Cancel
        </Button>
        <Button variant="danger" onClick={() => submit()}>
          Submit Quiz
        </Button>
      </div>
    </div>
  );
}

"use client";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
export default function QuizzesControl() {
  const { cid } = useParams();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  return (
    <div id="wd-quiz-controls" className="text-nowrap">
      <InputGroup className="w-50 float-start">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <FormControl placeholder="Search for Quiz" />
      </InputGroup>
      {((currentUser as any)?.role === "FACULTY" || (currentUser as any)?.role === "ADMIN") && (
        <Link href={`/courses/${cid}/quizzes/new`}>
          <Button
            variant="danger"
            size="lg"
            className="me-1 float-end"
            id="wd-add-quiz"
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Quiz
          </Button>
        </Link>
      )}
    </div>
  );
}

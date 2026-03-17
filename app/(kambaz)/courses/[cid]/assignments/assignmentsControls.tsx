"use client";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
export default function AssignmentControls() {
  const { cid } = useParams();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  return (
    <div id="wd-assignment-controls" className="text-nowrap">
      <InputGroup className="w-50 float-start">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <FormControl placeholder="Search for Assignment" />
      </InputGroup>
      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-group"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>
      {(currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN") && (
        <Link href={`/courses/${cid}/assignments/new`}>
          <Button
            variant="danger"
            size="lg"
            className="me-1 float-end"
            id="wd-add-assignment"
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Assignment
          </Button>
        </Link>
      )}
    </div>
  );
}

"use client";
import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";
import { clickSidebar } from "./sidebarReducer";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  const { sidebar } = useSelector((state: RootState) => state.sidebarReducer);
  const dispatch = useDispatch();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => dispatch(clickSidebar())}
        />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}

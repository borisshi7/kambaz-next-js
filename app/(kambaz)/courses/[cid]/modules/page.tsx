export default function Modules() {
  return (
    <div>
      <button> Collapse All </button>
      <button> View Progress </button>
      <select>
        <option>Publish All</option>
      </select>
      <button> + Module </button>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">Reading</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Developing Full Stack Next.js Web Applications - Chapter 1 -
                  Building React User Interfaces with HTML
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">A2</li>
              </ul>
              <ul className="wd-content">
                <li className="wd-content-item">Final Project</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to CSS</li>
                <li className="wd-content-item">
                  Selectors by tag ID, classes, and document structure
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">Reading</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Developing Full Stack Next.js Web Applications - Chapter 2
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">A1</li>
              </ul>
              <ul className="wd-content">
                <li className="wd-content-item">Final Project</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Learn about the JavaScript programming language
                </li>
                <li className="wd-content-item">
                  Become familiar with JavaScript Variables, Constants and
                  Datatypes
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">Reading</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Developing Full Stack Next.js Web Applications - Chapter 3
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">EVALUATIONS</span>
              <ul className="wd-content">
                <li className="wd-content-item">A3</li>
              </ul>
              <ul className="wd-content">
                <li className="wd-content-item">Final Project</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

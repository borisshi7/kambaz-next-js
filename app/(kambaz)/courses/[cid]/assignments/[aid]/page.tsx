export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea
        id="wd-description"
        defaultValue="The assignment is available online Submit a link to the landing page of"
      ></textarea>
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assignment-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-assignment-group">
                <option>ASSIGNMENT</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade As</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option>Percentage</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option>Online</option>
              </select>
              <div>
                <label>Online Entry Options</label>
                <br />
                <input
                  type="checkbox"
                  name="check-online-entry-options"
                  id="wd-chkbox-text-entry"
                />
                <label htmlFor="wd-chkbox-text-entry">Text Entry</label>
                <br />

                <input
                  type="checkbox"
                  name="check-online-entry-options"
                  id="wd-chkbox-website-url"
                />
                <label htmlFor="wd-chkbox-website-url">Website URL</label>
                <br />

                <input
                  type="checkbox"
                  name="check-online-entry-options"
                  id="wd-chkbox-media-recording"
                />
                <label htmlFor="wd-chkbox-media-recording">
                  Media Recording
                </label>
                <br />

                <input
                  type="checkbox"
                  name="check-online-entry-options"
                  id="wd-chkbox-student-annotation"
                />
                <label htmlFor="wd-chkbox-student-annotation">
                  Student Annotation
                </label>
                <br />
                <input
                  type="checkbox"
                  name="check-online-entry-options"
                  id="wd-chkbox-file-uploads"
                />
                <label htmlFor="wd-chkbox-file-uploads">File Uploads</label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign">Assign</label>
            </td>
            <td>
              <label htmlFor="wd-assign-to">Assign To</label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <input id="wd-assign-to" defaultValue={"Everyone"} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <label htmlFor="wd-due">Due</label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <input type="date" defaultValue="2024-05-13" id="wd-due" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <label htmlFor="wd-available-from">Available from</label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <input
                type="date"
                defaultValue="2024-05-06"
                id="wd-available-from"
              />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <label htmlFor="wd-until">To</label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <input
                type="date"
                defaultValue="2024-05-13"
                id="wd-until"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

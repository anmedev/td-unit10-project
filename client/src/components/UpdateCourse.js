//-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-IMPORTS-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorsDisplay from "./ErrorsDisplay";
import axios from "axios";

//-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-COMPONENT-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
const UpdateCourse = () => {

  // State
  const [course, setCourse] = useState(null);
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetches a single course from the REST API based on the course's id.
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        setErrors(error)
        console.log("Error fetching and parsing data", error);
      }
    };
    fetchCourse();
  }, [id]);

  // Event handler for the "Cancel" button.
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/courses/${id}`);
  };
  
    // Displays validation errors.
  const DisplayErrors = () => {
    if (errors) {
      return <ErrorsDisplay errors={errors} />
    }
  }

  if (course) {
    return (
      <main>
        <div className="wrap">
          <h2>Update Course</h2>
          <DisplayErrors errors={errors} />
          <form>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title} />
                <p>By Joe Smith</p>
                <label htmlFor="courseDescription">Course Description</label>
                <textarea id="courseDescription" name="courseDescription" defaultValue={course.description} />
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime} />
                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={course.materialsNeeded} />
              </div>
            </div>
            <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      </main>
    );
  }
};


export default UpdateCourse;
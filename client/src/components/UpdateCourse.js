//-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-IMPORTS-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import ErrorsDisplay from "./ErrorsDisplay";
import { api } from "../utils/apiHelper";
import axios from "axios";

//-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-COMPONENT-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
const UpdateCourse = () => {
  // Authenticated user.
  const { authUser } = useContext(UserContext);
  // States and Setter Functions.
  const [errors, setErrors] = useState([]);
  const [course, setCourse] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: authUser.id
  });
  // Retrieves the course id to use as parameter for the page's URL.
  const { id } = useParams();
  // Creates a navigate function used to navigate to different pages.
  const navigate = useNavigate();

//-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-DATA FETCHING-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
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

//-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-EVENT HANDLERS-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
  // Event handler that updates the state based on the user's input. 
  const handleInput = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // Event handler for the "Cancel" button.
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/courses/${id}`);
  };

   // Event handler for form submission. 
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api(`/courses/${id}`, "PUT", course, authUser);
      console.log(response.status);
      if (response.status === 204) {
        console.log(`Your course "${course.title}" has been updated!`);
        navigate("/");
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

//-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-PAGE RENDERING-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
  // Waits until the SetCourse setter func has course data from the REST API and renders the Update Course page if a course exists.
  if (course) {
    return (
      <main>
        <div className="wrap">
          <h2>Update Course</h2>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={handleSubmit}>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input id="courseTitle" name="title" onChange={handleInput} type="text" value={course.title} />
                <p>By Joe Smith</p>
                <label htmlFor="courseDescription">Course Description</label>
                <textarea id="courseDescription" name="description" onChange={handleInput} value={course.description} />
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="estimatedTime" type="text" onChange={handleInput} value={course.estimatedTime} />
                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleInput} value={course.materialsNeeded} />
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
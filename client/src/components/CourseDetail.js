//-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-IMPORTS-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { api } from "../utils/apiHelper";
import Markdown from "react-markdown";
import UserContext from "../context/UserContext";

//-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-COMPONENT-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
const CourseDetail = () => {

  // State
  const [course, setCourse] = useState(null);
  // const [showButton, setShowButton] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

  // Fetches a single course from the REST API based on the course's id.
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.log("Error fetching and parsing data", error);
      }
    };
    fetchCourse();
  }, [id]);

  // Testing that I can access authUser and course owner ID's
  console.log(authUser.id); // should be 16
  // console.log(course.User.userId); // should be 1

  

   // Event handler to delete a course when button is clicked.
   const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await api(`/courses/${id}`, "DELETE", course, authUser);
      if (response.status === 204) {
        console.log(`Your course "${course.title}" has been deleted!`);
        navigate("/");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // BUTTON LOGIC -- STEP 9
  if (authUser && authUser.id === course.User.id) {
    <>
      <Link to={`/courses/${id}/update`} className="button">Update Course</Link>
      <Link to="/" className="button" onClick={handleDelete}>Delete Course</Link>
    </>
  
  }

  // Waits until the SetCourse setter func has course data from the REST API and renders the Course Detail page if a course exists.
  if (course) {
    return (
      <main>
        <div className="actions--bar">
          <div className="wrap">
            <Link to={`/courses/${id}/update`} className="button" style={{ display: "none" }}>Update Course</Link>
            <Link to="/" className="button" onClick={handleDelete} style={{ display: "none" }}>Delete Course</Link>
            <Link to="/" className="button button-secondary">Return to List</Link>
          </div>
        </div>
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{course.title}</h4>
                <p>
                  By {course.User.firstName} {course.User.lastName}
                </p>
                <Markdown>{course.description}</Markdown>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{course.estimatedTime}</p>
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <Markdown>{course.materialsNeeded}</Markdown>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  };
};

export default CourseDetail;
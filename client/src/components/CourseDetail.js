//-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-IMPORTS-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Markdown from "react-markdown";

//-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-COMPONENT-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const { id } = useParams();

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

  // Waits until setCourse has data and renders the page once a course exists
  if (course) {
    return (
      <main>
        <div className="actions--bar">
          <div className="wrap">
            <a className="button" href={`/courses/${id}/update`}>Update Course</a>
            <a className="button" href="/">Delete Course</a>
            <a className="button button-secondary" href="/">Return to List</a>
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
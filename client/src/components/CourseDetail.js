//-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-IMPORTS-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";

//-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-COMPONENT-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
const CourseDetail = () => {
  const [courses, setCourses] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourses(response.data);
      } catch (error) {
        console.log("Error fetching and parsing data", error);
      }
    };
    fetchCourses();
  }, [id]);

  // Waits until setCourses has data and renders the page once the var courses exist
  if (courses) {
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
                <h4 className="course--name">{courses.title}</h4>
                <p>
                  By {courses.User.firstName} {courses.User.lastName}
                </p>
                <Markdown>{courses.description}</Markdown>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{courses.estimatedTime}</p>
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <Markdown>{courses.materialsNeeded}</Markdown>
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
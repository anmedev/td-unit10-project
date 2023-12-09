//-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-IMPORTS-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateCourse  =  () => {
    // States and Setter Functions
    const [course, setCourse] = useState({
        courseTitle: "",
        courseDescription: "",
        estimatedTime: "",
        materialsNeeded: ""
    })
    const navigate = useNavigate();

//-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-EVENT HANDLERS-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
   
// Event handler that updates the state based on the user's input. 
    const handleInput = (e) => {
      setCourse({ ...course, [e.target.name]: e.target.e });
    };

    // Event handler for the "Cancel" button.
    const handleCancel = (e) => {
      e.preventDefault();
      navigate("/");
    };

    // Event handler for form submission.
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:5000/api/courses", {course});
        console.log(response);
      } catch (error) {
        console.log("Error fetching and parsing data", error);
      }
    };

    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios.post("http://localhost:5000/api/courses", {course})
    //         .then(response => console.log(response))
    //         .catch(err => console.log(err))
    //     console.log(course);

    //   }

    return (
        <main>
          <div className="wrap">
            <h2>Create Course</h2>
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
              </ul>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="main--flex">
                <div>
                  <label htmlFor="courseTitle">Course Title</label>
                  <input id="courseTitle" onChange={handleInput} name="courseTitle" type="text" defaultValue />
                  <p>By Joe Smith</p>
                  <label htmlFor="courseDescription">Course Description</label>
                  <textarea id="courseDescription" onChange={handleInput} name="courseDescription" defaultValue={""} />
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input id="estimatedTime" onChange={handleInput} name="estimatedTime" type="text" defaultValue />
                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea id="materialsNeeded" onChange={handleInput} name="materialsNeeded" defaultValue={""} />
                </div>
              </div>
              <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
          </div>
        </main>
    );
}

export default CreateCourse;
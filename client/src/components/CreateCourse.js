//-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-IMPORTS-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import ErrorsDisplay from "./ErrorsDisplay";
import { api } from "../utils/apiHelper";

// import axios from "axios";

const CreateCourse  =  () => {
    // States and Setter Functions
    const [course, setCourse] = useState({
        courseTitle: "",
        courseDescription: "",
        estimatedTime: "",
        materialsNeeded: ""
    });
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    // const { actions } = useContext(UserContext);
    const { authUser } = useContext(UserContext);

//-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-EVENT HANDLERS-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
   
// Event handler that updates the state based on the user's input. 
    const handleInput = (e) => {
      setCourse({ ...course, [e.target.name]: e.target.e });
    };

    // Event handler for form submission.
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   try {
    //     const response = await axios.post("http://localhost:5000/api/courses", {authUser}, {});
    //     setCourse(response.data);
    //     navigate("/");
    //     console.log(response.data);
    //   } catch (error) {
    //     setErrors(error);
    //     console.log("Error fetching and parsing data", error);
    //   }
    // };

    // Event handler for form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
          const response = await api("/courses", "POST", null, authUser);
          setCourse(response);
          // navigate("/");
          // console.log(response);
        } catch (error) {
          setErrors(error);
          console.log("Error fetching and parsing data", error);
        }

    // const user = {
    //   username: username.current.value,
    //   password: password.current.value
    // }

    // try {
    //   const response = await api("/courses", "POST", {course}, authUser);
    //   if (response.status === 201) {
    //     console.log(`${authUser.emailAddress} is successfully signed up and authenticated!`);
    //     await actions.signIn(authUser);
    //     navigate("/");
    //   } else if (response.status === 400) {
    //     const data = await response.json();
    //     setErrors(data.errors);
    //   } else {
    //     throw new Error();
    //   }
    // } catch (error) {
    //   console.log(error);
    //   // navigate("/error");
    // }
  }
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   try {
    //     const response = await api("/courses", "POST", null, authUser);
    //     setCourse(response);
    //     // navigate("/");
    //     // console.log(response);
    //   } catch (error) {
    //     setErrors(error);
    //     console.log("Error fetching and parsing data", error);
    //   }
    // };

     // Event handler for the "Cancel" button.
     const handleCancel = (e) => {
      e.preventDefault();
      navigate("/");
    };
    
    // Displays validation errors.
  const DisplayErrors = () => {
    if (errors) {
      return <ErrorsDisplay errors={errors} />
    }
  }

    return (
        <main>
          <div className="wrap">
            <h2>Create Course</h2>
            <DisplayErrors errors={errors} />
            <form onSubmit={handleSubmit}>
              <div className="main--flex">
                <div>
                  <label htmlFor="courseTitle">Course Title</label>
                  <input id="courseTitle" onChange={handleInput} name="courseTitle" type="text" />
                  <p>By {authUser.firstName} {authUser.lastName}</p>
                  <label htmlFor="courseDescription">Course Description</label>
                  <textarea id="courseDescription" onChange={handleInput} name="courseDescription" />
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input id="estimatedTime" onChange={handleInput} name="estimatedTime" type="text" />
                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea id="materialsNeeded" onChange={handleInput} name="materialsNeeded" />
                </div>
              </div>
              <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
          </div>
        </main>
    );
}

export default CreateCourse;
// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/courses")
      .then(res => {
        setCourses(res.data);
        console.log(res);
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      })
  }, []);
  
  
  return (
    <div className="App">
      <ul>
        {
          courses.map(course => <li key={course.id}>{course.title}</li>)
        }
      </ul>
    </div>
  );
  
  
  
  
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;

import { Link } from "react-router-dom";
// import { useContext } from "react";
// import UserContext from "../context/UserContext";

const Header = () => {
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo"><Link to="/">Courses</Link></h1>
        <nav>
          <>
            <ul className="header--signedout">
              <li><Link to="/signup">Sign up</Link></li>
              <li><Link to="/signin">Sign in</Link></li>
            </ul>
          </>
          
          <>
            {/* <span>Welcome {authUser.name}</span> */}
            {/* <ul className="header--signedin">
              <li><Link to="/signout">Sign out</Link></li>
            </ul> */}
          </>
        </nav>
      </div>
    </header>
  );
};

// const Header = () => {
//   const { authUser } = useContext(UserContext);
//   return (
//     <header>
//       <div className="wrap header--flex">
//         <Link to="/">
//           <h1 className="header--logo">Courses</h1>
//         </Link>
//         <nav>
//           {authUser === null ? (
//             <>
//               <ul className="header--signedout">
//                 <li>
//                   <Link to="/signup">Sign up</Link>
//                 </li>
//                 <li>
//                   <Link to="/signin">Sign in</Link>
//                 </li>
//               </ul>
//             </>
//           ) : (
//             <>
//               <span>Welcome {authUser.name}</span>
//               <ul className="header--signedin">
//                 <li>
//                   <Link to="/signout">Sign out</Link>
//                 </li>
//               </ul>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

export default Header;

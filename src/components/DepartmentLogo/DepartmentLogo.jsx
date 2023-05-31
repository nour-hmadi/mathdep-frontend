import React, { useState, useEffect } from "react";
import logo from "../../assests/facultyofsciences.jpg";
import "./DepartmentLogo.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function DepartmentLogo() {
  const [info, setInfo] = useState([]);
  const [imge, setImge] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userId, setUserId ] = useState(); //this is how i am storing the id in the sessionStorage

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLoggedin(true);
    }
  }, []);
useEffect(()=> {
  if(sessionStorage.getItem("id")){
    setUserId("id");
  }
})
console.log(userId)

  useEffect(() => {
    const getAllInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
        setInfo(response.data.data);
        setImge(response.data.data.image.url);
        console.log(response);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    getAllInfo();
  }, []);
  console.log("infologgedINNN: ", info)

  return (
    <div className="dep-logo">
      {isLoggedin ? (
        <div>
<h1> HELLO </h1>        
        </div>
      ) : (
        <img src={logo} alt="mathdep logo" className="navbar-logo" />
      )}
      <h1 className="navbar-title">
        <span>Math</span>ematics
        <br />
        <span>Dep</span>artment
      </h1>
    </div>
  );
}

export default DepartmentLogo;
//   const [info, setInfo] = useState([]);
//   const [imge, setImge] = useState("");
//   const [isLoggedin, setIsLoggedin] = useState(false);
//   const [userid, setUserid] = useState([]);

//   useEffect(() => {
//     if (sessionStorage.getItem("token")) {
//       setIsLoggedin(true);
    
//       console.log(sessionStorage.getItem("token"));
//     }
//   }, []);

//   useEffect(() => {
//     const getAllInfo = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/user/${userId}`
//         );
//         setInfo(response.data.data);
//         setImge(response.data.data.image.url);

//         // console.log(response.data.data);
//       } catch (error) {
//         console.error(`Error: ${error}`);
//       }
//     };

//     getAllInfo();
//   }, []);

//   return (
//     <div className="dep-logo">
//       {isLoggedin ? (
//         <div>
//           {" "}
//           <img src={imge} alt="mathdep logo" className="navbar-logo" />{" "}
//           <h1>hi{info.name}</h1>
//         </div>
//       ) : (
//         <img src={logo} alt="mathdep logo" className="navbar-logo" />
//       )}
//       <h1 className="navbar-title">
//         <span>Math</span>ematics
//         <br />
//         <span>Dep</span>artment
//       </h1>
//     </div>
//   );
// }

// export default DepartmentLogo;

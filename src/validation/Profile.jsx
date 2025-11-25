import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [vis, setIsVis] = useState(false);
  const [role, setIsRole] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);

    useEffect(() => {
    let email = localStorage.getItem("Bharat_email");
    let g_email = Cookies.get("bharat_email");
    const fetchData = async () => {
      try{
        if(email!=null){
          const res = await axios.get(
            "https://aatulya-bharat.onrender.com/user/getuser",
            {
              params: { email: email },
            }
          );
          setProfileData(res.data.users_det[0]);
          setLoading(false);
        }
        else{
          console.log("bharat");
          const res = await axios.get("https://aatulya-bharat.onrender.com/api/auth/v1/getGoogleLogin",{
            params: { g_email: g_email },
          });
          setProfileData(res.data.user_details[0]);
          setLoading(false);
        }
     }
    catch (e){
        console.error("Error fetching profile:", e);
        setLoading(false);
    }};
    fetchData();
  }, []);

  // useEffect(() => {
  //   const email = "user@example.com"; // Using demo email since localStorage not available
  //   const fetchData = async () => {
  //     try {
  //       // Demo data since API call won't work in this environment
  //       const demoData = {
  //         name: "John Doe",
  //         email: "user@example.com",
  //         phone: "+91 9876543210",
  //         address: "123 Main Street, City",
  //         userRole: "User",
  //         company: "Tech Corp"
  //       };
  //       setProfileData(demoData);
  //       setLoading(false);
  //     } catch (error) {
        // console.error("Error fetching profile:", error);
        // setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    setIsVis(true);
  };

  const onfocus = (key) => {
    if (key === "userRole") {
      setIsRole(true);
      setEditingField(key);
    } else if (key !== "email") {
      setEditingField(key);
      setTimeout(() => {
        document.getElementById(key)?.focus();
      }, 0);
    }
  };

  const handleSubmit = async () => {
    try {
      // Replace with your actual API call
      // const res = await fetch("https://aatulya-bharat.onrender.com/user/updateuser", {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(profileData)
      // });

      console.log("Submitting updated profile:", profileData);
      setIsVis(false);
      setIsRole(false);
      setEditingField(null);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsVis(false);
    setIsRole(false);
    setEditingField(null);
    // Refresh data or revert changes
    window.location.reload();
  };

  const goBack = () => {
    window.history.back();
  };

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={goBack}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-700 hover:text-indigo-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <div className="w-20"></div> {/* Spacer for center alignment */}
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(profileData).map((key) => {
              const label = formatLabel(key);

              if (key === "_id" || key === "password" || key === "__v"  ) return null;

              return (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {label}
                  </label>

                  {key === "userRole" && (role || editingField === key) ? (
                    <div className="space-y-3 p-4 bg-gray-50 rounded-lg border-2 border-indigo-200">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="user-role"
                          name="userRole"
                          value="User"
                          checked={profileData.userRole === "User"}
                          onChange={handleChange}
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label htmlFor="user-role" className="text-sm font-medium text-gray-700">
                          User
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="dealer-role"
                          name="userRole"
                          value="Dealer"
                          checked={profileData.userRole === "Dealer"}
                          onChange={handleChange}
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label htmlFor="dealer-role" className="text-sm font-medium text-gray-700">
                          Dealer
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="relative group">
                      <input
                        type="text"
                        id={key}
                        name={key}
                        value={profileData[key] || ""}
                        onChange={handleChange}
                        disabled={key === "email"}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${
                          key === "email"
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : "bg-white hover:border-indigo-300"
                        } ${editingField === key ? "ring-2 ring-indigo-500 border-indigo-500" : "border-gray-300"}`}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                      />
                      {key !== "email" && (
                        <button
                          onClick={() => onfocus(key)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-indigo-100 transition-colors duration-200 group-hover:opacity-100 opacity-60"
                          title={`Edit ${label}`}
                        >
                          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          {vis && (
            <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-blue-800">Profile Information</h3>
              <p className="mt-1 text-sm text-blue-700">
                Click the edit icon next to any field to make changes. Your email address cannot be modified for security reasons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./sign.css";

// const Profile = () => {
//   const [profileData, setProfileData] = useState([]);
//   const [vis,setIsVis] = useState(false);
//   const [role,setIsRole] = useState(false);

  // useEffect(() => {
  //   const email = localStorage.getItem("Bharat_email");
  //   //console.log(email);
  //   const fetchData = async () => {
  //     const res = await axios.get(
  //       "https://aatulya-bharat.onrender.com/user/getuser",
  //       {
  //         params: { email: email },
  //       }
  //     );
  //     setProfileData(res.data.users_det[0]);
  //   };
  //   fetchData();
  // }, []);
//  console.log(profileData);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({ ...profileData, [name]: value });
//     setIsVis(true);
//   };

//   const onfocus = (key) => {
//    // console.log(key)
//    if(key == "userRole"){
//     setIsRole(true);
//    }
//    else{
//     document.getElementById(key).focus();
//    }
//   }

//   return (
//     <div className="profile-container">
//       <h1 className="profile-title">My Profile</h1>
//       <div className="profile-grid">
//        {Object.keys(profileData).map((key) => {
//   const label = key.replace(/([A-Z])/g, " $1").trim();

//   if (label === "_id" || label === "password") return null;

//   return (
//     <div key={key} className="profile-card">
//       <span className="profile-label">{label}:</span>

//       {key === "userRole"  && role ? (
//         <div className="flex flex-col gap-2 mt-2">
//           <label className="inline-flex items-center gap-2">
//             <input
//               type="radio"
//               name="userRole"
//               value="User"
//               checked={profileData.userRole === "User"}
//               onChange={handleChange}

//             />
//             <span>User</span>
//           </label>
//           <label className="inline-flex items-center gap-2">
//             <input
//               type="radio"
//               name="userRole"
//               value="Dealer"
//               checked={profileData.userRole === "Dealer"}
//               onChange={handleChange}
//             />
//             <span>Dealer</span>
//           </label>
//         </div>
//       ) : (
//         <div className="flex items-center gap-2">
//           <input
//             type="text"
//             id={key}
//             name={key}
//             value={profileData[key]}
//             onChange={handleChange}
//             className="profile-input"
//             disabled = {key=='email'}
//           />
//           <span className="edit-icon cursor-pointer" onClick={() => onfocus(key)}>
//             ✏️
//           </span>
//         </div>
//       )}
//     </div>
//   );
// })}
//           {vis?<button className="bg-zinc-400 w-fit ps-3 pe-3 p-1 rounded-lg relative left-full" disabled={vis} >Submit</button>:null}
//       </div>

//     </div>
//   );
// };

// export default Profile;

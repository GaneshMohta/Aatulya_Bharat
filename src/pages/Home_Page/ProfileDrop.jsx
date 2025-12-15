import  {useEffect, useState, useCallback, useMemo} from 'react'
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";


const useUserAuth = () => {
    return useMemo(() => {
      let userEmail = localStorage.getItem('Bharat_email');



      if (!userEmail) {
        userEmail =  localStorage.getItem("bharat_user");
        if(!userEmail)
        return { isAuthenticated: false, username: null };
      }

      const username = userEmail.split('@')[0];
      return { isAuthenticated: true, username };
    }, []);
};

const handleLogOut=()=>  {
  localStorage.removeItem('Bharat_email');
  localStorage.removeItem('token');
  localStorage.removeItem('bharat_user');
}

const ProfileDropdown = ({ isVisible, onToggle, user }) => (
  <div className="relative1">
    <CgProfile
      onClick={onToggle}
      className="profile-icon"
      role="button"
      tabIndex={0}
      aria-label="Profile menu"
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
    />
    {isVisible && (
      <div className="profile-dropdown">
        {!user.isAuthenticated ? (
          <Link
            to="/signin"
            className="signin-link"
            onClick={onToggle}
          >
            <button className="signin-button" >
              Sign In
            </button>
          </Link>
        ) : (
          <>
          <Link
            to="/profile"
            className="profile-link"
            onClick={onToggle}
          >
            {user.username}
          </Link>
          <Link to='/signup' className='text-center'>
          <button className='bg-white rounded-md p-2' onClick={handleLogOut}>SignOut</button></Link>
          </>
        )}
      </div>
    )}
  </div>
);



const ProfileDrop = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const user = useUserAuth();

  const toggleDropdown = useCallback(() => {
    setDropdownVisible(prev => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownVisible && !event.target.closest('.relative1')) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownVisible]);

  return (
    <ProfileDropdown
      isVisible={isDropdownVisible}
      onToggle={toggleDropdown}
      user={user}
    />
  );
};

export default ProfileDrop;

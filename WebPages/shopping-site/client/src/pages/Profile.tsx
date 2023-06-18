import useUser from "../hooks/useUser";
import "../styles/Profile.scss";

const Profile = () => {
  const { user } = useUser();

  const content = (
    <div className="userDetails">
      <p>User Name: {user?.userName}</p>
      {/* <ul>
        <h3>Address</h3>
        <li>{currentUser?.address.country}</li>
        <li>{currentUser?.address.city}</li>
        <li>{currentUser?.address.street}</li>
        <li>{currentUser?.address.postCode}</li>
      </ul> */}
    </div>
  );

  return (
    <div className="profilePage">
      {user ? content : <p>no user found</p>}
      <button className="button-6">View order history</button>
    </div>
  );
};

export default Profile;

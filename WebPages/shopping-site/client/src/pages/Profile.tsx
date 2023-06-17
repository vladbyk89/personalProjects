import { User } from "../App";
import "../styles/Profile.scss";
interface ProfileProps {
  currentUser: User | null;
}

const Profile = ({ currentUser }: ProfileProps) => {
  const content = (
    <div className="userDetails">
      <p>User Name: {currentUser?.userName}</p>
      <ul>
        <h3>Address</h3>
        <li>{currentUser?.address.country}</li>
        <li>{currentUser?.address.city}</li>
        <li>{currentUser?.address.street}</li>
        <li>{currentUser?.address.postCode}</li>
      </ul>
    </div>
  );

  return (
    <div className="profilePage">
      {currentUser ? content : <p>no user found</p>}
      <button className="button-6">View order history</button>
    </div>
  );
};

export default Profile;

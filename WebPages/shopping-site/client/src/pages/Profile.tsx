import { User } from "../App";
import "../styles/Profile.scss";
interface ProfileProps {
  currentUser: User | null;
}

const Profile = ({ currentUser }: ProfileProps) => {
  return (
    <div className="profilePage">
      {currentUser ? <p>{currentUser.userName}</p> : <p>no user found</p>}
      <button className="button-6">View order history</button>
    </div>
  );
};

export default Profile;

import { useEffect, useState } from "react";
import "../styles/Profile.scss";
import axios from "axios";
import { UserType } from "../App";

const Profile = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("api/v1/users/getUser");
      const user = await data.user;
      console.log(user);
      setUser((prev) => (prev = user));
    };

    fetch();
  }, []);

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

import { useState, useEffect } from "react";
import Login from "./Login";
import axios from "axios";

const Profile = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get("api/v1/users/getUser");
      if (data) setIsLogged(true);
      console.log(data);
      console.log(isLogged
    };

    fetchUser();
  }, []);

  return <div>Profile</div>;
};

export default Profile;

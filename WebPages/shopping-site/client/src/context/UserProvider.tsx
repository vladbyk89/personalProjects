import React, { ReactElement, createContext, useState, useEffect } from "react";
import axios from "axios";
import { CartStateType } from "./CartProvider";

export interface User {
  carts: CartStateType[];
  email: string;
  password: string;
  userName: string;
  _id: string;
}

// const initUser: User = {
//   cardId: "12233",
//   email: "vladb89@gmail.com",
//   password: "12345678",
//   userName: "vladb89",
//   _id: "87654321",
// };

export interface UseUserContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>> | undefined;
}

const initContextState: UseUserContextType = {
  user: undefined,
  setUser: undefined,
};

const UserContext = createContext<UseUserContextType>(initContextState);

interface ChildrenType {
  children?: ReactElement | ReactElement[];
}

export const UserProvider = ({ children }: ChildrenType): ReactElement => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("api/v1/users/getUser");
      const user = await data.user;
      setUser((prev) => (prev = user));
    };

    fetch();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

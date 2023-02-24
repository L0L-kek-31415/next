"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type DataType = {
  email: string;
  role: string;
};

interface ContextProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  data: DataType;
  socket: any;
  setSocket: Dispatch<SetStateAction<any>>;
  setData: Dispatch<SetStateAction<DataType>>;
}

const GlobalContext = createContext<ContextProps>({
  userId: "",
  socket: null,
  setUserId: (): string => "",
  setSocket: (): any => null,
  data: { email: "", role: "" },
  setData: (): void => {},
});

export const GlobalContextProvider = ({ children }: any) => {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState<DataType>({
    email: "",
    role: "",
  });
  const [socket, setSocket] = useState<any>(null);

  return (
    <GlobalContext.Provider
      value={{ userId, setUserId, socket, setSocket, data, setData }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

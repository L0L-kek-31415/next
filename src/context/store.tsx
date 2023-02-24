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
  socket: any;
};

interface ContextProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  data: DataType;
  setData: Dispatch<SetStateAction<DataType>>;
}

const GlobalContext = createContext<ContextProps>({
  userId: "",
  setUserId: (): string => "",
  data: { email: "", role: "", socket: null },
  setData: (): void => {},
});

export const GlobalContextProvider = ({ children }: any) => {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState<DataType>({
    email: "",
    role: "",
    socket: null,
  });

  return (
    <GlobalContext.Provider value={{ userId, setUserId, data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

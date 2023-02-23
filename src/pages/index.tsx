import Header from "@/components/header";
import MyDrawer from "@/components/navBar";
import userService from "@/services/user.service";
import { useGlobalContext } from "@/context/store";
import { useEffect } from "react";

interface Props {}

const Main: React.FC<Props> = () => {
  const { userId, setUserId, data, setData } = useGlobalContext();
  useEffect(() => {
    const getUser = async () => {
      const currUser = (await userService.me()).data;
      setUserId(currUser.id);
      setData({ email: currUser.email, role: currUser.role, socket: null });
    };
    getUser();
  }, []);
  return (
    <div style={{ justifyContent: "space-between" }}>
      <Header />
      <MyDrawer />
    </div>
  );
};

export default Main;

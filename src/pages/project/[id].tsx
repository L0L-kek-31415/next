import MyDrawer from "@/components/navBar";
import { useRouter } from "next/router";
import Boards from "@/components/board/list";
import { useGlobalContext } from "@/context/store";
import { useEffect } from "react";
import userService from "@/services/user.service";

interface Props {}
interface IProject {
  id: number;
  title: string;
  tickets: any[];
}

const Project: React.FC<Props> = () => {
  const router = useRouter();
  const { id } = router.query;
  const { setUserId, setData } = useGlobalContext();
  useEffect(() => {
    const getUser = async () => {
      const currUser = (await userService.me()).data;
      setUserId(currUser.id);
      setData({ email: currUser.email, role: currUser.role, socket: null });
    };
    getUser();
  }, []);

  return (
    <div>
      <MyDrawer></MyDrawer>
      <Boards id={id ? +id : 1}></Boards>
    </div>
  );
};

export default Project;

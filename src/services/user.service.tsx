import instance from "./axios";

class UserService {
  me = async () => {
    return instance.get("user/me");
  };

  getAll = async () => {
    return instance.get("user/");
  };
}

export default new UserService();

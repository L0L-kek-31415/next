import instance from "./axios";

class ProjectService {
  getAll = () => {
    return instance.get("board");
  };
  getId = (id: number) => {
    return instance.get(`board/${id}`);
  };
  create = (values: any) => {
    return instance.post("board", values);
  };
  delete = (id: number) => {
    return instance.delete(`board/${id}`);
  };
  getByProject = (id: number) => {
    return instance.get(`/board/project/${id}`);
  };
  ticket = (board_id: number, ticket_id: number) => {
    return instance.post(`board/${board_id}/ticket`, { ticket_id: ticket_id });
  };
}

export default new ProjectService();

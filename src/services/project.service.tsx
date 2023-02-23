import instance from "./axios";

class ProjectService {
  getAll = () => {
    return instance.get("project");
  };
  getId = (id: number) => {
    return instance.get(`project/${id}`);
  };
  create = (values: any) => {
    return instance.post("project", values);
  };
  delete = (id: number) => {
    return instance.delete(`project/${id}`);
  };
  addMember = (member_id: any, project_id: any) => {
    return instance.post(`project/${project_id}/member`, {
      member_id: member_id,
    });
  };
}

export default new ProjectService();

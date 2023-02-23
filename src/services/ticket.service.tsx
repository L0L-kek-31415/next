import instance from "./axios";

class TicketService {
  getAll = () => {
    return instance.get("ticket");
  };
  getId = (id: number) => {
    return instance.get(`ticket/${id}`);
  };
  create = (values: any) => {
    return instance.post("ticket", values);
  };
  delete = (id: number) => {
    return instance.delete(`ticket/${id}`);
  };
  board = (ticket_id: number, board_id: number) => {
    return instance.post(`ticket/${ticket_id}/board`, { board_id: board_id });
  };
}

export default new TicketService();

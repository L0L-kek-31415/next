import Card from "@material-ui/core/Card";
import RemoveIcon from "@mui/icons-material/Remove";
import AddTicket from "../ticket/new";
import { useGlobalContext } from "@/context/store";
import { CardHeader } from "@material-ui/core";
import OneTicket, { ITicket } from "../ticket/one";
import { useDroppable } from "@dnd-kit/core";

interface Props {
  project_id: number;
  id: number;
  title: string;
  tickets: Array<ITicket>;
}

const OneBoard: React.FC<Props> = ({ project_id, id, title, tickets }) => {
  const { data, socket } = useGlobalContext();
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: {
      tickets: tickets,
    },
  });

  return (
    <Card
      ref={setNodeRef}
      style={{
        overflow: "hidden",
        overflowY: "scroll",
        msOverflowStyle: "none",
        WebkitScrollSnapType: "none",
        display: "inline-block",
        height: 650,
        width: 300,
        marginRight: 20,
        color: isOver ? "green" : undefined,
      }}
      variant="outlined"
    >
      {data.role == "admin" ? (
        <RemoveIcon
          sx={{ float: "right" }}
          onClick={() => {
            // @ts-ignore
            socket.emit("deleteBoard", {
              board_id: id,
              project_id: project_id,
            });
          }}
        />
      ) : (
        <></>
      )}
      <CardHeader title={title}></CardHeader>
      {tickets &&
        tickets.map((ticket: ITicket) => {
          return (
            <OneTicket
              key={ticket.id}
              id={ticket.id}
              project_id={project_id}
              title={ticket.title}
              description={ticket.description}
              updated_at={ticket.updated_at}
              created_at={ticket.created_at}
              board_id={id}
            />
          );
        })}
      <AddTicket projectID={project_id} boardID={id}></AddTicket>
    </Card>
  );
};
export default OneBoard;

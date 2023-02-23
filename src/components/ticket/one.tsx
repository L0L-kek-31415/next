import Card from "@material-ui/core/Card";
import Typography from "@mui/material/Typography";
import { CardContent, CardHeader } from "@material-ui/core";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDraggable } from "@dnd-kit/core";
import { useGlobalContext } from "@/context/store";

export interface ITicket {
  project_id: number;
  id: number;
  title: string;
  description: string;
  updated_at: Date;
  created_at: Date;
}

export const OneTicket: React.FC<ITicket> = ({
  id,
  project_id,
  title,
  description,
}) => {
  const { data } = useGlobalContext();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = transform
    ? {
        position: "absolute",
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        width: 250,
        backgroundColor: "lightgrey",
      }
    : {
        backgroundColor: "white",
        marginTop: 5,
      };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CardContent style={{ textAlign: "center" }}>
        {data.role == "admin" ? (
          <RemoveIcon
            sx={{ float: "right" }}
            onClick={() => {
              // @ts-ignore
              data.socket.emit("ticketDelete", {
                id: id,
                project_id: project_id,
              });
            }}
          />
        ) : (
          <></>
        )}
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OneTicket;

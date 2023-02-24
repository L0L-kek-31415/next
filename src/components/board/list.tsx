import { useEffect, useState, DragEvent, useRef } from "react";
import socketIO from "socket.io-client";
import AddBoard from "./new";
import { AddMember } from "../member/add";
import { useGlobalContext } from "@/context/store";
import userService from "@/services/user.service";
import Header from "../header";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import OneBoard from "./one";

const Boards = (props: { id: number }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );
  const { userId, setUserId, data, setData } = useGlobalContext();
  const [boards, setBoard] = useState<any>();

  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    // @ts-ignore
    socket.current = socketIO.connect("ws://localhost:3000", {
      extraHeaders: {Authorization: localStorage ? 
      "Bearer " + localStorage.getItem('access') :
      null
    }
    });

    const getUser = async () => {
      const currUser = (await userService.me()).data;
      setUserId(currUser.id);
      setData({
        email: currUser.email,
        role: currUser.role,
        socket: socket.current,
      });
    };
    getUser();

    if (!boards) {
      console.log('no boards')
      // @ts-ignore
      socket.current.emit("boardByProject", props.id, (event: any) => {

      setBoard(event.data);
    });
    }

    // @ts-ignore
    socket.current.addEventListener("boardByProject", (event: any) => {
      console.log("before event", boards)
      setBoard(event.data);
      console.log("updated evetn data", event.data)

    });
    return () => {
      // @ts-ignore
      socket.current.close();
    };
  }, [socket, props.id]);

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (over && active.data.current.board_id != over.id) {
      console.log(boards, "boards in drag end")
      const boardsUpdate: Array<any>= []
      boards.filter((board: any) => {
        const newTickets: any[] = []
        board.tickets.filter((ticket: any) => {
          if(ticket.id != active.id) {
            newTickets.push(ticket)
          }
        })
        boardsUpdate.push({id: board.id, title: board.title, tickets: newTickets})
      })
      setBoard(boardsUpdate)
      // @ts-ignore
      socket.current.emit("changeTicket", {
        project_id: props.id,
        board_id: over.id,
        ticket_id: active.id,
      });
    }

  }
  return (
    <div style={{ marginLeft: 300 }}>
      <Header></Header>
      <AddMember id={props.id} />
      <DndContext 
        // onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}>
        {Array.isArray(boards) &&
          boards.map(
            (board: { tickets: Array<any>; id: number; title: string }) => {
              return (
                <OneBoard
                  project_id={props.id}
                  id={board.id}
                  title={board.title}
                  tickets={board.tickets}
                />
              );
            }
          )}
        <AddBoard socket={socket.current} projectID={props.id}></AddBoard>
      </DndContext>
    </div>
  );
};

export default Boards;

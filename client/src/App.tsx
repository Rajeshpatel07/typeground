import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { generateId } from "./utils/utils";
import { Header } from "./components";
import { useSocket } from "./context/Socket";



const App: React.FC = () => {


  const { socket } = useSocket();

  useEffect(() => {
    const handleSocketMessage = (event: MessageEvent) => {

      const message = JSON.parse(event.data)
      if (message.event == 'connect') {
        const username = localStorage.getItem('username') || ""
        console.log(username)
        if (username.length == 0) {
          localStorage.setItem('username', `user@${generateId()}`);
        }
        localStorage.setItem("socketId", message.socketId)
      }
    }

    if (socket) {
      socket.addEventListener('message', handleSocketMessage);
    }

    return () => {
      if (socket) {
        socket.removeEventListener('message', handleSocketMessage);
      }
    }
  }, [socket])


  return (
    <div className=" flex flex-col h-screen box-border w-full backgradient">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;

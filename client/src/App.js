import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Context } from "./contexts/Context";
import "./styles/App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Regsiter from "./pages/Regsiter";
import NotFound from "./pages/NotFound";
import DesktopIcons from "./components/DesktopIcons";
import Taskbar from "./components/Taskbar";

export default function App() {
  const [user, setUser] = useState(null);
  const [chat, setChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [otherUserTyping, setOtherUserTyping] = useState(false);

  return (
    <div className="desktop">
      <DesktopIcons />
      <Context.Provider
        value={{
          user,
          setUser,
          chat,
          setChat,
          socket,
          setSocket,
          otherUserTyping,
          setOtherUserTyping,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Regsiter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Taskbar />
      </Context.Provider>
    </div>
  );
}

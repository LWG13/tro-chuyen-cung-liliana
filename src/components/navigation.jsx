import React, {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import "./navigation.scss";
import logo from "./logo.png"
import { IoSettings } from "react-icons/io5";

import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Skeleton, Stack, Box } from "@mui/material";
import { IoInformationCircle } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import { initTTS } from "./hooks/tts"

export default function Navigation() {
  const auth = useSelector(state => state.auth)
  const [menu, setMenu] = useState(false)
  const [curr, setCurr] = useState("chat")
  useEffect(() => {
    initTTS();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <div className="navigation">
          <div className="menu">
           <RiMenu2Fill style={{width: "40px", height: "40px"}} onClick={() => setMenu(!menu)} />
            </div>
                      {menu && <Menu setCurr={setCurr} curr={curr} menu={menu} setMenu={setMenu} auth={auth} />}
         <img src={logo} alt="Trò chuyện cùng Liliana" width="130px" className="liliana"/>
          <Tooltip
  title="Trang web Trò chuyện với Liliana này được truyền cảm hứng bởi nhân vật Liliana trong Liên Quân"
  arrow
  enterTouchDelay={0}
>
  <Box sx={{ cursor: "pointer", display: "inline-flex" }}>
    <IoInformationCircle size={40} />
  </Box>
</Tooltip>
        </div>
      </div>
        <div className="content">
          <Outlet />
        </div>
      
    </div>
  );
}

function Menu({curr, setCurr, menu, setMenu, auth}) {
  return (
    <div className={menu ? "sidenav active" : "sidenav"}>
      <div className="n">
        <img src={logo} alt="logo" className="logo" />
        <span onClick={() => setMenu(false)}>&times;</span>
      </div>
      <hr />
       {auth.image ? (<>

       <div className="list" >
        <li className={curr === "chat" ? `listItemBlue` : "listItem"} onClick={() => setCurr("chat")}><Link to="/" className="link" onClick={(() => setMenu(false))}><IoChatbubbleEllipsesSharp style={{width: "25px", height: "25px",paddingRight: "10px" }}/>Trò chuyện</Link></li>
       <li className={curr === "setting" ? `listItemBlue` : "listItem"} onClick={() => setCurr("setting")}><Link to="/setting" className="link"><IoSettings style={{width: "25px", height: "25px",paddingRight: "10px"}}/>Cài đặt</Link></li>
    
      </div>
      <div className="userInfo">
    <img
      src={auth?.image}
      alt="avatar"
      className="avatar"
    />
    <span className="username">
      {auth?.username}
    </span>
  </div>
         
           </>) : <SidebarSkeleton />}
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      {/* Title */}
      <Skeleton variant="text" width="70%" height={40} />

      {/* Menu items */}
      <Stack spacing={1} sx={{ marginTop: 2 }}>
        {[1, 2].map((_, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              padding: "10px",
            }}
          >
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width="60%" height={24} />
          </Box>
        ))}
      </Stack>

      {/* Push user to bottom */}
      <Box sx={{ flexGrow: 1 }} />

      {/* User info */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          padding: "10px",
        }}
      >
        <Skeleton variant="circular" width={36} height={36} />
        <Skeleton variant="text" width={120} />
      </Box>
    </Box>
  );
}
import React, {useState, useEffect} from "react"
import { logOutUser } from "./ReduxToolkit/authSlice"
import { Grid } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios";
import "./home.scss"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IoSettings } from "react-icons/io5";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { Skeleton, Stack, Box } from "@mui/material";

export default function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)
  const [curr, setCurr] = useState("chat")
  return (
    <div className="home" >
          <Grid container spacing={1} >
  <Grid size={{xs: 0, md: 4, lg: 3}}
    sx={{ display: { xs: "none", md: "block" } }}
  >
    <div className="sideBar" >
      {auth.image ?  ( <>
      <h2>Trò chuyện cùng Liliana</h2>
      <div className="list" >
      
       <li className={curr === "chat" ? `listItemBlue` : "listItem"} onClick={() => setCurr("chat")}><Link to="/" className="link"><IoChatbubbleEllipsesSharp style={{width: "25px", height: "25px", paddingRight: "10px" }}/>Trò chuyện</Link></li>
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
        </>) : <SidebarSkeleton /> }
    </div>
  </Grid>

  <Grid size={{ xs:12, md: 8, lg: 9}}>
    <div className="contentHome">
      <Outlet />
    </div>
  </Grid>
</Grid>
    </div>
  )
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
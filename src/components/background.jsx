import React, {useState, useEffect} from "react"
import "./setting.scss"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import "./setting.scss"
import { toast } from "react-toastify";
import bg1 from "../image/bg1.jpg";
import bg2 from "../image/bg2.jpg";
import bg3 from "../image/bg3.jpg";
import bg4 from "../image/bg4.jpg";
import { Grid } from "@mui/material"


const background = ["default", bg1, bg2, bg3, bg4];
export default function Background() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)
  const [curr, setCurr] = useState(localStorage.getItem("background"))
  const change = (bg) => {
    setCurr(bg)
    localStorage.setItem("background", bg)
    toast.success("Đã thay đổi hình nền thành công!")
  }
  return (
    <div className="background" >
      <h1>Chọn hình nền cho cuộc trò chuyện của bạn!</h1>
      <br/>
           <Grid container spacing={3} > 
      {background.map(bg => (
                  <Grid size={{xs: 6, sm: 6, md: 4, lg: 4}} key={bg}>
        <div className="backgroundImg" key={bg} onClick={() => setCurr(bg)} >
          {bg === "default" ? (
            <div className="default" style={{backgroundColor: "black", width: "60px" , height:"150px"}} >
             </div>
          ) : <img src={bg} alt="background" className="backImg" /> }
          <br/>
          <button className="btnBackground" onClick={() => change(bg)}>{curr === bg ? "đã chọn" : "chọn"}</button>
        </div>
       </Grid>
      ))}
    </Grid>
    </div>
  )
}

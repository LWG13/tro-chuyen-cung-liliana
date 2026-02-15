import React, {useState, useEffect} from "react"
import "./setting.scss"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logOutUser } from "./ReduxToolkit/authSlice"
import { TbLogout2 } from "react-icons/tb";
import { BsFileImageFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
export default function Setting() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    if(auth.userAuth === false) navigate("/login")
  }, [navigate, auth.userAuth])
  return (
    <div className="setting" >
     <div className="list" >
      
       <li className="listItem" ><Link to="/account" className="link"><MdAccountCircle style={{width: "35px", height: "35px", paddingRight: "10px" }}/>Tài khoản</Link></li>
       <li className="listItem" ><Link to="/background"  className="link"><BsFileImageFill style={{width: "35px", height: "35px",paddingRight: "10px"}}/>Hình nền trò chuyện</Link></li>
      <li className="listItem" onClick={() => dispatch(logOutUser())}><span  className="link"><TbLogout2 style={{width: "35px", height: "35px",paddingRight: "10px"}}/>Đăng xuất</span></li>
      </div>
    
    </div>
  )
}
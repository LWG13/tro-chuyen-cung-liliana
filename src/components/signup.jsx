import "./signup.scss"
import axios from "axios"
import { useForm, Form } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import {useRef, useState, useEffect} from "react"
import { registerUser, verifyUser, googleUser } from "./ReduxToolkit/authSlice.js"
import { Link, useParams ,useNavigate } from "react-router-dom"
import logo from "./logo.png"

export default function Signup() {
   const auth = useSelector(state => state.auth)

  const { register, control, handleSubmit , formState: { errors, isSubmitting, isDirty } } = useForm();
   const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
   dispatch(verifyUser())
  })
  useEffect(() => {
    if(auth.userAuth === true) navigate("/")
  }, [navigate, auth.userAuth]) 

    const inputRef= useRef()
    const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  })
  console.log(user)
  const handleSubmit1 = (e) => {
  dispatch(registerUser(user))
  }

      return(
            <div className="signupPage" >
                   <div className="wrapper1">
      <img
  src={logo}
  alt="Trò chuyện cùng Liliana"
  width="180"
  style={{
    display: "block",
    margin: "0 auto"
  }}
/>
      <Form action="" method="POST" control={control} onSubmit={handleSubmit(handleSubmit1)} >
       <h1>Đăng Kí</h1> 
       <h2>Đăng kí để trò chuyện với Liliana nào!</h2>
       <div className="input-box">
         <input type="text" placeholder="Tên"  {...register("username", { required: {value: true, message: "Tên không được để trống" }, pattern: {
            value: /^[A-Za-z0-9]+$/i,
            message: "Chỉ có thể đặt chữ cái và số",
          },})} onChange={(e => setUser({...user, username: e.target.value}))} />
       </div>
        <span style={{color: "red"}}>{errors.username?.message}</span>
       <div className="input-box">
         <input type="email" placeholder="Email" required  {...register("email", { required: {value: true, message: "Email không được để trống"}, pattern: {
       value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 
       message: "Sai kiểu Email"
    }})} onChange={(e => setUser({...user, email: e.target.value}))}/>
       </div>
        <span style={{color: "red"}}>{errors.email?.message}</span>
        <div className="input-box">
         <input type="password" placeholder="Mật khẩu" required {...register("password", { minLength:{ value: 6, message: "Mật khẩu không được dưới 6 chữ cái" },pattern: {
            value: /^[A-Za-z0-9]+$/i,
            message: "Chỉ có thể đặt chữ cái và số",
          },  required: {
      value: true,
      message: "Mật khẩu không được để trống"
         }, })}  onChange={(e => setUser({...user, password: e.target.value}))} />
        </div>
          <span style={{color: "red"}}>{errors.password?.message}</span>     
        {auth.registerStatus === "reject" ? (
       <span style={{color: "red"}}>{auth.registerError}</span>
      )  : null} 
                           <button className="btn"  disabled={auth.registerStatus === "pending" }  ><span>{auth.registerStatus === "pending" ? "...đang đăng kí" : "đăng kí"}</span> </button>
                  <div className="register-link">
       <p>Đã có tài khoản?<Link to="/login">.  Đăng nhập</Link></p>
        <br/>

      </div>
      </Form>
                     <button className="google" onClick={() => dispatch(googleUser())}>
                      Tiếp tục với Google
                     </button>
     </div>
  </div>

)
}
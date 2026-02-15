import { Link, useNavigate} from "react-router-dom"
import { FaUser, FaLock } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { Form, useForm} from "react-hook-form"
import "./setting.scss"
import { editUser } from "./ReduxToolkit/authSlice"
import { resetSuccess } from "./ReduxToolkit/authSlice"
export default function Account() {
  const auth = useSelector(state => state.auth)

 const [user, setUser] = useState({
    username: auth.username,
    image: auth.image,
  })
 
  const dispatch = useDispatch()
  const { register, control, handleSubmit , formState: { errors, isSubmitting, isDirty } } = useForm();
  const navigate = useNavigate()
  const handleSubmit1 = (e) => {
   dispatch(editUser(user))
  }
  const previewFile = (file) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = () => {
      const base64 = reader.result
      setUser(prev => ({...prev, image: base64}))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    previewFile(file)
  }
  useEffect(() => {
    if(auth.edit === true) { 
      navigate("/setting")
      setTimeout(() => {
      dispatch(resetSuccess());
    }, 1000);
    }
  }, [auth.edit, navigate])
      

  return (
    <div className="account" >
     <h1>Chỉnh sửa tài khoản</h1>
      <Form action ="" method="post"  control={control} onSubmit={handleSubmit(handleSubmit1)}>
        <label>Ảnh đại diện</label>
        <img src={user.image} alt="avatar" className="avatar" />
        <label className="upload-btn" >
        <div className="button1">Đăng ảnh lên</div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        
        </label>
        
        <label style={{color: "white"}}>Tên người dùng</label>       
       <div className="input-box">
         <input type="text"  value={user.username} placeholder="tên tài khoản" required {...register("username", { required: {value: true, message: "Tên không được để trống" }, pattern: {
             value: /^[A-Za-z0-9]+$/i,
             message: "Chỉ có thể đặt chữ cái và số",
           },})} onChange={(e => setUser(prev => ({
  ...prev,
  username: e.target.value
})))}  />
         <FaUser className="icon"/>
       </div>
       <br/>
        <span style={{color: "red"}}>{errors.username?.message}</span>
       <br/>

       <button className="btn" disabled={auth.editStatus === "pending"}>{auth.editStatus === "pending" ? "...đang lưu" : "lưu"}</button>
      </Form>
    </div>
  )
}
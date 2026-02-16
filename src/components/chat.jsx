import React, {useState, useEffect, useRef} from "react" 
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import "./chat.scss"
import { useSelector } from "react-redux"
import { useSendMessage } from "./hooks/useSendMessage";
import liliana from "./liliana1.jpeg"
import { IoMdSend } from "react-icons/io";
import { FaRegImage } from "react-icons/fa6";
import Message from "./message"
import Skeleton from "@mui/material/Skeleton";
import { initSTT, startListening, stopListening, getListeningState } from "./hooks/stt";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";


export default function Chat() {

const scrollRef = useRef();

  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [curr, setCurr] = useState(localStorage.getItem("background"))
  const sendMutation = useSendMessage();

  // fetch chat
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: ["chat"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}chat/chat?page=${pageParam}`
      );
      return res.data;
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore
        ? pages.length + 1
        : undefined,
  });

  const messages =
  data?.pages
    ?.slice()
    .reverse()
    .flatMap(page =>
      page.messages.slice().reverse()
    )
  || [];
  // auto scroll bottom
  const isFirstLoad = useRef(true);

useEffect(() => {
  if (isFirstLoad.current) {
    scrollRef.current?.scrollIntoView();
    isFirstLoad.current = false;
  }
}, []);
  useEffect(() => {
  scrollRef.current?.scrollIntoView({
    behavior: "smooth"
  });
}, [sendMutation.isSuccess]);

  // send
  const handleSend = () => {
    if (!text && !image) return;
    if(text.length > 1500) return alert("Tin nhắn không được quá 1500 ký tự")
    sendMutation.mutate({
      message: text,
      imageUrl: image
    });

    setText("");
    setImage("");
  };
const handleScroll = (e) => {
  if (
    e.target.scrollTop === 0 &&
    hasNextPage &&
    !isFetchingNextPage
  ) {
    fetchNextPage();
  }
};
const previewFile = (file) => {
  const reader = new FileReader()

  reader.readAsDataURL(file)

  reader.onloadend = () => {
    const base64 = reader.result
    setImage(base64)
  }
}

const handleFileChange = (e) => {
  const file = e.target.files?.[0]
  if (!file) return

  previewFile(file)
}
  const [isListening, setIsListening] = useState(false);
  const toggleMic = () => {

  if (getListeningState() === true) {

    stopListening();
    setIsListening(false);

  } else {

    startListening();
    setIsListening(true);

  }

};
  useEffect(() => {

  initSTT(

    (voiceText) => {
      setText(voiceText);
    },

    () => {
      setIsListening(false);
    }

  );

}, []);
  return (
    <div className="chat" style={{backgroundImage: curr === "default" ? "none" : `url(${curr})` }}>

      <div className="message" onScroll={handleScroll}>

        <div className="liliana">
          <img src={liliana} alt="liliana" className="lilianaImg" />
          <h2>Liliana 🦊</h2>
          <span>Cô nàng hồ ly quyến rũ</span>
          <p>"Thật vui khi được gặp cậu tại đây!"</p>
         
       
      </div>
        {isLoading ? (
    <div className="skeletonContainer">

      
      <div className="messageRow assistant">
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{
    bgcolor: "#212122"
  }}
        />

        <Skeleton
          variant="rounded"
          width={200}
          height={80}
          sx={{
    bgcolor: "#212122"
  }}
        />
      </div>

      <div className="messageRow user">
        <Skeleton
          variant="rounded"
          width={180}
          height={80}
          sx={{
    bgcolor: "#212122"
  }}
        />
      </div>

      <div className="messageRow assistant">
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{
    bgcolor: "#212122"
  }}
        />

        <Skeleton
          variant="rounded"
          width={200}
          height={80}
          sx={{
    bgcolor: "#212122"
  }}
        />
      </div>
      <div className="messageRow assistant">
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{
      bgcolor: "#212122"
      }}
        />

        <Skeleton
          variant="rounded"
          width={200}
          height={80}
          sx={{
      bgcolor: "#212122"
      }}
        />
      </div>

      <div className="messageRow user">
        <Skeleton
          variant="rounded"
          width={180}
          height={80}
          sx={{
      bgcolor: "#212122"
      }}
        />
      </div>

     
      <div className="messageRow assistant">
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{
      bgcolor: "#212122"
      }}
        />

        <Skeleton
          variant="rounded"
          width={200}
          height={80}
          sx={{
      bgcolor: "#212122"
      }}
        />
      </div>
      <div className="messageRow assistant">
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{
      bgcolor: "#212122"
      }}
        />

        <Skeleton
          variant="rounded"
          width={200}
          height={80}
          sx={{
      bgcolor: "#212122"
      }}
        />
      </div>

      <div className="messageRow user">
        <Skeleton
          variant="rounded"
          width={180}
          height={80}
          sx={{
      bgcolor: "#212122"
      }}
        />
      </div>
     <div className="messageRow assistant">
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{
      bgcolor: "#212122"
      }}
        />

        <Skeleton
          variant="rounded"
          width={200}
          height={80}
          sx={{
      bgcolor: "#212122"
      }}
        />
      </div>
      <div className="messageRow assistant">
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{
      bgcolor: "#212122"
      }}
        />

        <Skeleton
          variant="rounded"
          width={200}
          height={80}
          sx={{
      bgcolor: "#212122"
      }}
        />
      </div>

      <div className="messageRow user">
        <Skeleton
          variant="rounded"
          width={180}
          height={80}
          sx={{
      bgcolor: "#212122"
      }}
        />
      </div>

     
      <div className="messageRow assistant">
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{
      bgcolor: "#212122"
      }}
        />

        <Skeleton
          variant="rounded"
          width={200}
          height={80}
          sx={{
      bgcolor: "#212122"
      }}
        />
      </div>

    </div>
  ) : ( 
        messages.map(msg => (
          <Message key={msg._id} msg={msg} />
        )))}
        <div ref={scrollRef} />
    
      </div>
      <div className="inputContainer">

  
  {image && (
  <div className="previewImg">
    <img src={image} alt="preview" />

    <button
      className="removeImgBtn"
      onClick={() => setImage("")}
      type="button"
    >
      ✕
    </button>
  </div>
)}

  <div className="inputField">

  <label className="upload-btn">
    <FaRegImage
      style={{ color: "white", width: "28px", height: "28px" }}
    />
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
    />
  </label>

  <button
    type="button"
    className="micBtn"
    onClick={toggleMic}
  >
    {isListening
      ? <FaMicrophoneSlash />
      : <FaMicrophone />
    }
  </button>

  <input
    placeholder="Nhập tin nhắn..."
    value={text}
    onChange={(e) => setText(e.target.value)}
  />

  <button
    disabled={(text.trim() === "" && image === "") || sendMutation.isPending || isListening === true}
    onClick={handleSend}
  >
    <IoMdSend style={{ color: "white", width: "24px", height: "24px" }} />
  </button>

</div>

</div>
    </div>
  );
}
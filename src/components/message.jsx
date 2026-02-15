import liliana from "./lilianaChat.jpeg";
import "./chat.scss";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { speak, stopSpeak } from "./hooks/tts";

import { useEffect, useState } from "react";

export default function Message({ msg }) {

  const isUser = msg.role === "user";
  const [displayedText, setDisplayedText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleVoice = () => {

  if (isSpeaking) {

    stopSpeak();
    setIsSpeaking(false);

  } else {

    speak(msg.text, () => {
      setIsSpeaking(false);
    });

    setIsSpeaking(true);

  }

};

  useEffect(() => {

  if (!msg.text) return;

  // user → hiện ngay
  if (isUser) {
    setDisplayedText(msg.text);
    return;
  }

  // Nếu message cũ (quá 3 giây) → hiện full luôn
  const messageTime = new Date(msg.createdAt).getTime();
  const now = Date.now();

  const isNewMessage = now - messageTime < 3000;

  if (!isNewMessage) {
    setDisplayedText(msg.text);
    return;
  }

  // Nếu là tin nhắn mới → animate
  let i = 0;
  setDisplayedText("");
    speak(msg.text, () => {
      setIsSpeaking(false);
    });
    setIsSpeaking(true)

  const interval = setInterval(() => {

    i++;

    setDisplayedText(msg.text.slice(0, i));

    if (i >= msg.text.length) {

      clearInterval(interval);

              

    }

  }, 20);

  return () => clearInterval(interval);

  }, [msg.text]);
  const handleCopy = () => {
  navigator.clipboard.writeText(msg.text);
};
  return (
    <div className={`messageRow ${isUser ? "user" : "assistant"}`}>

      {!isUser && (
        <img src={liliana} className="avatar" />
      )}

      <div className="bubble">

        {msg.imageUrl && (
          <img
            src={msg.imageUrl}
            className="messageImg"
          />
        )}

        {msg.text && (
          <div className="messageText">
            {isUser ?displayedText : <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeHighlight]}
>
  {displayedText}
</ReactMarkdown> }
            <br/>
             {!isUser && (
            <div style={{display: "flex"}}>
              <button
                className="voiceBtn"
                onClick={handleVoice}
              >
                {isSpeaking ? "🔇" : "🔊"}
              </button>
             <button className="voiceBtn" onClick={handleCopy}>
        📋
      </button>
            </div>
            )}

          </div>
        )}

        {msg.pending && (
          <div className="pending">
            Đang gửi...
          </div>
        )}

        {msg.typing && (
          <div className="typing">
            Liliana đang suy nghĩ...
          </div>
        )}

      </div>

    </div>
  );
}


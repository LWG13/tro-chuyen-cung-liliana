let recognition = null;
let isListening = false;

export function initSTT(onResult, onEnd) {

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error("Browser không hỗ trợ Speech Recognition");
    return null;
  }

  recognition = new SpeechRecognition();

  recognition.lang = "vi-VN";
  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.onresult = (event) => {

    let transcript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }

    onResult(transcript);
  };

  recognition.onend = () => {
    isListening = false;
    onEnd?.();
  };

  return recognition;
}

export function startListening() {
  if (!recognition) return;
  isListening = true;
  recognition.start();
}

export function stopListening() {
  if (!recognition) return;
  isListening = false;
  recognition.stop();
}

export function getListeningState() {
  return isListening;
}
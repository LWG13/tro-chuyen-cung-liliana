let voices = [];
let vietnameseVoice = null;
let currentUtterance = null;

export function initTTS() {

  voices = speechSynthesis.getVoices();

  vietnameseVoice = voices.find(
    v => v.lang === "vi-VN" || v.lang.startsWith("vi")
  );

  // fallback nếu chưa load
  speechSynthesis.onvoiceschanged = () => {

    voices = speechSynthesis.getVoices();

    vietnameseVoice = voices.find(
      v => v.lang === "vi-VN" || v.lang.startsWith("vi")
    );

  };

}

export function speak(text, onEnd) {

  if (!text) return;

  // stop cái cũ
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  currentUtterance = utterance;

  utterance.lang = "vi-VN";

  if (vietnameseVoice) {
    utterance.voice = vietnameseVoice;
  }

  utterance.rate = 1;
  utterance.pitch = 1.1;
  utterance.volume = 1;

  // khi nói xong
  utterance.onend = () => {

    currentUtterance = null;

    if (onEnd) onEnd();

  };

  // khi bị stop
  utterance.onerror = () => {

    currentUtterance = null;

    if (onEnd) onEnd();

  };

  speechSynthesis.speak(utterance);

}

export function stopSpeak() {

  speechSynthesis.cancel();

  currentUtterance = null;

}

export function isSpeaking() {
  return speechSynthesis.speaking;
}
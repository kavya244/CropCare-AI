
import { useState, useRef } from "react";

export default function useSpeech(language) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const languageCode = language === "kn" ? "kn-IN" : "en-IN";

  // Speak the AI response
  const speak = (text) => {
    if (!("speechSynthesis" in window)) {
      alert("Speech output is not supported in this browser.");
      return;
    }

    if (!text || !text.trim()) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = languageCode;
    speech.rate = 0.9;
    speech.pitch = 1;

    const voices = window.speechSynthesis.getVoices();

    const selectedVoice = voices.find(
      (voice) => voice.lang.toLowerCase() === languageCode.toLowerCase()
    );

    if (selectedVoice) {
      speech.voice = selectedVoice;
    }

    window.speechSynthesis.speak(speech);
  };

  // Listen to the user's question
  const listen = (onResult) => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice recognition is not supported. Please try Google Chrome or Microsoft Edge."
      );
      return;
    }

    // Prevent multiple recognition sessions
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    recognition.lang = languageCode;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      if (transcript && transcript.trim()) {
        onResult(transcript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);

      if (event.error === "not-allowed") {
        alert("Please allow microphone access in your browser.");
      } else if (event.error === "no-speech") {
        alert("No speech detected. Please try again.");
      } else {
        alert("Voice recognition failed. Please try again.");
      }

      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("Unable to start microphone:", error);
      setListening(false);
      recognitionRef.current = null;
    }
  };

  // Stop microphone and speech
  const stop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setListening(false);
  };

  return {
    speak,
    listen,
    stop,
    listening
  };
}

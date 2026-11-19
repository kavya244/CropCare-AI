
import { useState } from "react";
import {
  Mic,
  Volume2,
  Send,
  LoaderCircle
} from "lucide-react";

import "./VoiceAssistant.css";
import { useLanguage } from "../../context/LanguageContext";
import useSpeech from "../../hooks/useSpeech";
import { askAssistant } from "../../services/api";

export default function VoiceAssistant({ file }) {
  const { language, t } = useLanguage();
  const { speak, listen, listening } = useSpeech(language);

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isKannada = language === "kn";

  const sendMessage = async (text = message) => {
    const question = text.trim();

    if (!question || loading) return;

    if (!file) {
      setError(
        isKannada
          ? "ದಯವಿಟ್ಟು ಮೊದಲು ಬೆಳೆಯ ಎಲೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
          : "Please upload a crop leaf image before asking a question."
      );
      return;
    }

    setLoading(true);
    setError("");
    setReply("");

    try {
      const data = await askAssistant(question, language, file);

      if (!data.reply) {
        throw new Error(
          isKannada
            ? "ಉತ್ತರ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
            : "No reply received. Please try again."
        );
      }

      setReply(data.reply);
    } catch (err) {
      console.error("Assistant error:", err);

      setError(
        err.message ||
          (isKannada
            ? "ಕ್ಷಮಿಸಿ, ಉತ್ತರ ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ."
            : "Sorry, unable to get an answer.")
      );
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    if (!file) {
      setError(
        isKannada
          ? "ಮೊದಲು ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
          : "Please upload an image first."
      );
      return;
    }

    setError("");

    listen((spokenText) => {
      if (spokenText?.trim()) {
        setMessage(spokenText);
        sendMessage(spokenText);
      }
    });
  };

  return (
    <section className="voice-card">
      <div className="voice-header">
        <div className="voice-icon">
          <Mic size={23} />
        </div>

        <div>
          <h2>{t("voice")}</h2>
          <p>
            {isKannada
              ? "ನಿಮ್ಮ ಬೆಳೆಯ ಚಿತ್ರದ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ."
              : "Ask questions about your uploaded crop image."}
          </p>
        </div>
      </div>

      <div className="voice-image-status">
        {file ? (
          <>
            <span className="status-dot" />
            <span>
              {isKannada ? "ಚಿತ್ರ ಲಗತ್ತಿಸಲಾಗಿದೆ:" : "Image attached:"}{" "}
              <strong>{file.name}</strong>
            </span>
          </>
        ) : (
          <span>
            {isKannada
              ? "ಪ್ರಶ್ನೆ ಕೇಳಲು ಮೊದಲು ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
              : "Upload an image before asking a question."}
          </span>
        )}
      </div>

      <div className="voice-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder={
            isKannada
              ? "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ..."
              : "Ask about your crop..."
          }
          disabled={loading}
        />

        <button
          type="button"
          className="icon-btn mic-btn"
          onClick={startListening}
          disabled={loading || listening}
          aria-label={isKannada ? "ಮಾತನಾಡಿ" : "Voice input"}
          title={isKannada ? "ಮಾತನಾಡಿ" : "Voice input"}
        >
          <Mic size={20} />
        </button>

        <button
          type="button"
          className="icon-btn send-btn"
          onClick={() => sendMessage()}
          disabled={loading || !message.trim()}
          aria-label={isKannada ? "ಕಳುಹಿಸಿ" : "Send question"}
          title={isKannada ? "ಕಳುಹಿಸಿ" : "Send question"}
        >
          {loading ? (
            <LoaderCircle className="spin" size={20} />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>

      {listening && (
        <p className="listening-text">
          {isKannada
            ? "ನಿಮ್ಮ ಮಾತನ್ನು ಕೇಳಲಾಗುತ್ತಿದೆ..."
            : "Listening to your question..."}
        </p>
      )}

      {loading && (
        <p className="listening-text">
          {isKannada
            ? "ನಿಮ್ಮ ಚಿತ್ರವನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ..."
            : "AI is analyzing your image and question..."}
        </p>
      )}

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {reply && (
        <div className="assistant-reply">
          <h3>
            {isKannada ? "AI ಸಹಾಯಕನ ಉತ್ತರ" : "AI Assistant Answer"}
          </h3>

          <p>{reply}</p>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => speak(reply)}
          >
            <Volume2 size={17} />
            {isKannada ? "ಉತ್ತರವನ್ನು ಕೇಳಿ" : "Listen to response"}
          </button>
        </div>
      )}
    </section>
  );
}

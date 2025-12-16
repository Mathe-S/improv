"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Web Speech API types
interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

export default function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Lazy initialization or check support here
    const { webkitSpeechRecognition, SpeechRecognition } = window as unknown as IWindow;
    const SpeechRecognitionClass = SpeechRecognition || webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsListening(true);
      
      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        let hasFinal = false;
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            hasFinal = true;
          }
        }
        setTranscript(currentTranscript);
        
        if (hasFinal) {
           recognition.stop();
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'network') {
           setError("Network error: Chrome requires online access for speech recognition. Please check your connection.");
        } else if (event.error === 'not-allowed') {
           setError("Microphone permission denied.");
        } else if (event.error === 'no-speech' || event.error === 'aborted') {
           // Ignore 'no-speech' (silence) and 'aborted' (manual stop)
           return; 
        } else {
           setError(event.error);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setTimeout(() => {
        setError("Browser not supported.");
      }, 0);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        // Abort previous session to ensure clean state
        recognitionRef.current.abort();
        setTranscript("");
        setError(null);
        
        // Small delay to ensure abort completes
        setTimeout(() => {
           try {
              recognitionRef.current.start();
           } catch (err: any) {
              // Ignore "already started" errors if they happen despite abort
              if (err.name !== "InvalidStateError") {
                  console.error("Failed to start recognition:", err);
                  setError("Failed to start. Please try again.");
              }
           }
        }, 150); 
      } catch (err) {
        console.error("Failed to abort/start recognition:", err);
      }
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  return { isListening, transcript, startListening, stopListening, error, isSupported: !error && error !== "Browser not supported." };
}

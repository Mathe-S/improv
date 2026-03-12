"use client";

import { useState } from "react";
import { joinCommunity } from "./actions";

export default function CommunityForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    setErrorMessage("");
    
    const result = await joinCommunity(formData);
    
    if (result.error) {
      setStatus("error");
      setErrorMessage(result.error);
    } else {
      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-md mx-auto p-4 bg-white/5 border border-white/20 text-white">
        Thank you for joining! Check your email for a welcome message.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <form action={handleSubmit} className="max-w-md mx-auto flex gap-4 w-full">
        <input 
          type="email" 
          name="email"
          required
          placeholder="Enter your email" 
          className="flex-1 bg-white/5 border border-white/20 px-4 text-white focus:outline-none focus:border-accent-red"
        />
        <button 
          disabled={status === "loading"}
          className="px-6 py-3 bg-white text-black font-bold cursor-pointer hover:bg-zinc-200 transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "JOINING..." : "NOTIFY ME"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-400 text-sm mt-2">{errorMessage || "Something went wrong. Please try again."}</p>
      )}
    </div>
  );
}

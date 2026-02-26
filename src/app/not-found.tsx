"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const variants = [
  {
    hi: "Galat jagah aa gaye ho. Chalo wapas",
    en: "You've come to the wrong place. Let's go back",
  },
  {
    hi: "Bhaii sach me yaar, mere machine pe chal raha tha. Chalo wapas",
    en: "Trust me bro, it works on my machine. Let's go back",
  },
];

export default function NotFound() {
  const [msg, setMsg] = useState(variants[0]);

  useEffect(() => {
    const randomMsg = variants[Math.floor(Math.random() * variants.length)];
    setMsg(randomMsg);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white px-6 text-center">
      <h1 className="text-6xl font-black mb-6 tracking-tighter italic">404</h1>

      <p className="mb-4 text-lg text-black/60 dark:text-white/60">
        {msg.hi}{" "}
        <Link
          href="/"
          className="inline-block px-4 py-1 rounded bg-black dark:bg-white text-white dark:text-black hover:scale-105 transition-transform font-semibold mx-1"
        >
          Ghar
        </Link>{" "}
        chalte hain
      </p>

      <p className="text-lg text-black/60 dark:text-white/60">
        {msg.en}{" "}
        <Link
          href="/"
          className="inline-block px-4 py-1 rounded bg-black dark:bg-white text-white dark:text-black hover:scale-105 transition-transform font-semibold mx-1"
        >
          Home
        </Link>
      </p>
    </div>
  );
}

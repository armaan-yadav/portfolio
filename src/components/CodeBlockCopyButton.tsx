"use client";

import { useEffect } from "react";
import { RiFileCopyLine, RiCheckLine } from "react-icons/ri";

export default function CodeBlockCopyButton() {
  useEffect(() => {
    const copyCode = async (button: HTMLButtonElement, code: string) => {
      await navigator.clipboard.writeText(code);
      const icon = button.querySelector("svg");
      const originalHTML = button.innerHTML;
      
      if (icon) {
        button.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="w-4 h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>`;
        
        setTimeout(() => {
          button.innerHTML = originalHTML;
        }, 2000);
      }
    };

    const addCopyButtons = () => {
      const codeBlocks = document.querySelectorAll(".blog-content pre");

      codeBlocks.forEach((pre) => {
        // Skip if button already exists
        if (pre.querySelector(".copy-button")) return;

        const code = pre.querySelector("code");
        if (!code) return;

        const button = document.createElement("button");
        button.className =
          "copy-button absolute top-2 right-2 p-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-300 opacity-0 transition-opacity";
        button.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="w-4 h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path></svg>`;
        button.setAttribute("aria-label", "Copy code");

        button.addEventListener("click", () => {
          copyCode(button, code.textContent || "");
        });

        (pre as HTMLElement).style.position = "relative";
        pre.appendChild(button);
      });
    };

    // Add copy buttons after a short delay to ensure content is rendered
    const timer = setTimeout(addCopyButtons, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}

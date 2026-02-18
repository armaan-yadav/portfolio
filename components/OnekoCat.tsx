import Script from "next/script";

export default function OnekoCat() {
  return (
    <Script
      src="/oneko/oneko.js"
      data-cat="/oneko/oneko.gif"
      strategy="afterInteractive"
    />
  );
}

import { useEffect } from "react";

export const BotpressChat = () => {
  useEffect(() => {
    // Load the Botpress script dynamically
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v0/inject.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        botId: "92a0c3b5-3107-450e-b1ab-ea5861764743", // your bot ID
        hostUrl: "https://cdn.botpress.cloud/webchat/v0",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "YOUR_CLIENT_ID", // from Botpress dashboard
        botName: "My Bot",
        showCloseButton: true,
        theme: "light",
      });
    };
  }, []);

  return null; // widget injects itself, no JSX needed
};

import { useEffect } from "react";

// This component injects the vanilla JS particle background script on mount, and removes it on unmount
export default function ParticleBackground() {
  useEffect(() => {
    // Dynamically create a script tag for the vanilla JS particle background
    const script = document.createElement("script");
    script.src = "/src/components/models/hero_models/particleBackground.js";
    script.async = true;
    script.id = "particle-bg-script";
    document.body.appendChild(script);

    return () => {
      // Remove the script tag
      document.getElementById("particle-bg-script")?.remove();
      // Remove the canvas if it exists
      document.getElementById("particle-canvas")?.remove();
    };
  }, []);

  return null; // This component does not render any React elements
}

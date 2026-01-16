import LandingPage from "./components/LandingPage";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += Math.floor(Math.random() * 8) + 5;
      if (value >= 100) {
        value = 100;
        clearInterval(interval);

        // slight delay for smooth exit
        setTimeout(() => setLoading(false), 500);
      }
      setProgress(value);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Loader progress={progress} />;
  }

  return <LandingPage />;
}

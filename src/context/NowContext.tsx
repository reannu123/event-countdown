import React, { createContext, useContext, useEffect, useState } from "react";

const NowContext = createContext<number>(Date.now());
type Props = { children: React.ReactNode };

const TICK_MS = 1000;

export const NowProvider: React.FC<Props> = ({ children }) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), TICK_MS);

    // optional: resync when tab becomes visible again
    const onVisibilityChange = () => { if (!document.hidden) setNow(Date.now()); };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <NowContext.Provider value={now}>{children}</NowContext.Provider>;
};


export const useNow = () => useContext(NowContext);
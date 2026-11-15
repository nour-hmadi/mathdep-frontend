import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ServerWakeNotice.css";

// The API runs on Render's free plan, which sleeps after 15 minutes without visitors and takes up to a minute to
// wake up. Instead of a blank page, this note explains the wait when an API request takes longer than 3 seconds.
let waiting = 0;                 // API requests still waiting for an answer
const listeners = new Set();
const update = (change) => {
  waiting += change;
  listeners.forEach((listener) => listener(waiting));
};
axios.interceptors.request.use((config) => {
  update(1);
  return config;
});
axios.interceptors.response.use(
  (response) => {
    update(-1);
    return response;
  },
  (error) => {
    update(-1);
    return Promise.reject(error);
  },
);

function ServerWakeNotice() {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    let timer;
    const listener = (count) => {
      if (count === 0) {
        clearTimeout(timer);
        timer = undefined;
        setSlow(false);
      } else if (!timer) {
        timer = setTimeout(() => setSlow(true), 3000);
      }
    };
    listeners.add(listener);
    listener(waiting);
    return () => {
      listeners.delete(listener);
      clearTimeout(timer);
    };
  }, []);

  if (!slow) return null;
  return (
    <div className="server-wake-notice" role="status">
      <span className="server-wake-dot" />
      <span>
        Waking up the server: this demo runs on a free plan that sleeps when nobody visits, so the first visit can
        take up to a minute.
      </span>
    </div>
  );
}

export default ServerWakeNotice;

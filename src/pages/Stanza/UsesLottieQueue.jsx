import { useCallback, useEffect, useMemo, useState } from "react";

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useLottieQueue() {
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);

  const enqueue = useCallback((payload) => {
    const item = { id: makeId(), ...payload };
    setQueue((q) => [...q, item]);
    return item.id;
  }, []);

  const done = useCallback(() => {
    setCurrent(null);
  }, []);

  // avvia prossimo quando idle
  useEffect(() => {
    if (current) return;
    if (queue.length === 0) return;

    setCurrent(queue[0]);
    setQueue((q) => q.slice(1));
  }, [queue, current]);

  return useMemo(
    () => ({ enqueue, done, current, pending: queue.length }),
    [enqueue, done, current, queue.length]
  );
}

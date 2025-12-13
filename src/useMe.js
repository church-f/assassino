import { useEffect, useState } from "react";
import { apiFetch } from "./Api";

export function useMe() {
  const [state, setState] = useState({ loading: true, user: null });

  useEffect(() => {
    let alive = true;
    apiFetch("/me")
      .then(user => alive && setState({ loading: false, user }))
      .catch(() => alive && setState({ loading: false, user: null }));
    return () => { alive = false; };
  }, []);

  return state;
}

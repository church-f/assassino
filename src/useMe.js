import { useEffect, useState } from "react";
import { apiFetch } from "./api";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
  const [state, setState] = useState({ loading: true, user: null });

  // useEffect(() => {
  //   let alive = true;
  //   apiFetch("/me")
  //     .then(user => alive && setState({ loading: false, user }))
  //     .catch(() => alive && setState({ loading: false, user: null }));
  //   return () => { alive = false; };
  // }, []);

  // return state;

  return useQuery({
    queryKey: ["me"],
    queryFn: () => apiFetch("/me"),
    retry: false,
    staleTime: 1000 * 60,         // 1 min
    refetchOnWindowFocus: true    // utile per session scaduta
  });
}

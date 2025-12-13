import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { apiFetch } from "./Api";

export async function loginAndCreateSession(email, password) {
  // 1) login Firebase
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await cred.user.getIdToken();

  // 2) prendi CSRF token (server setta anche cookie csrf)
  const { csrfToken } = await apiFetch("/auth/csrf");

  // 3) crea session cookie HttpOnly
  await apiFetch("/auth/session", {
    method: "POST",
    body: { idToken },
    headers: { "x-csrf-token": csrfToken }
  });

  // 4) opzionale (consigliato): logout dal client Firebase
  // così “la verità” diventa il cookie server-side
  await signOut(auth);

  return true;
}

export async function logoutSession() {
  const { csrfToken } = await apiFetch("/auth/csrf");
  await apiFetch("/auth/logout", { method: "POST", headers: { "x-csrf-token": csrfToken } });
}

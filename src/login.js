import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { apiFetch } from "./api";

// registra + crea session cookie
export async function signupAndCreateSession({ email, password, displayName }) {
  // 1) crea utente su Firebase
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  // 2) opzionale: set displayName su Firebase
  if (displayName) {
    await updateProfile(cred.user, { displayName });
  }

  // 3) idToken
  const idToken = await cred.user.getIdToken();

  // 4) csrf
  const { csrfToken } = await apiFetch("/auth/csrf");

  // 5) crea session cookie server-side
  await apiFetch("/auth/session", {
    method: "POST",
    body: { idToken },
    headers: { "x-csrf-token": csrfToken }
  });

  // 6) opzionale: logout firebase client
  await signOut(auth);

  return true;
}

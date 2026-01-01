import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from "./firebase";
import { apiFetch } from "./api";

/**
 * Prende un Firebase user già autenticato (email/pass o Google),
 * e crea la session cookie HttpOnly sul backend.
 */
async function createServerSessionFromUser(user, displayName) {
  const idToken = await user.getIdToken();

  // CSRF cookie + token
  const { csrfToken } = await apiFetch("/auth/csrf");

  // crea session cookie server-side
  await apiFetch("/auth/session", {
    method: "POST",
    body: { idToken, displayName },
    headers: { "x-csrf-token": csrfToken }
  });

  // opzionale: logout dal client Firebase (cookie diventa source of truth)
  await signOut(auth);

  return true;
}

// Email/password: signup + session
export async function signupAndCreateSession({ email, password, displayName }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  if (displayName) {
    await updateProfile(cred.user, { displayName });
  }

  return createServerSessionFromUser(cred.user, displayName);
}

// Google: login/signup + session (Popup)
export async function googleLoginAndCreateSession() {
  const provider = new GoogleAuthProvider();
  // opzionale: forzi la scelta account
  provider.setCustomParameters({ prompt: "select_account" });

  const cred = await signInWithPopup(auth, provider);
  return createServerSessionFromUser(cred.user);
}

/**
 * Variante Redirect (utile se popup bloccati / iOS Safari):
 * 1) chiami googleLoginRedirect()
 * 2) al reload pagina chiami handleGoogleRedirectResult()
 */
export async function googleLoginRedirect() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  await signInWithPopup(auth, provider);
}

export async function handleGoogleRedirectResult() {
  const res = await getRedirectResult(auth);
  if (!res?.user) return false; // niente redirect in corso
  return createServerSessionFromUser(res.user);
}

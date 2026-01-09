import { loadStripe } from "@stripe/stripe-js";

const API = import.meta.env.VITE_API_URL;
const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLIC_KEY);

export async function apiFetch(path, { method="GET", body, headers } = {}, cb, cbErr) {
  const res = await fetch(`${API}${path}`, {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.error || `HTTP ${res.status}`);
    err.status = res.status;
    if(cbErr) cbErr(err, res);
    // showToast({ open: true, message: err.message, severity: 'error' });
    throw err;
  }else{
    if(cb) cb(data, res);
  }
  return data;
}

export const startCheckout = async (userId, userEmail) => {
  try {
    const response = await fetch(`${API}/stripe/createSession`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, email: userEmail }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error("Errore nel pagamento");

    // const stripe = await stripePromise;
    // await stripe.redirectToCheckout({ sessionId: data.sessionId });

    window.location.href = data.sessionUrl;
  } catch (error) {
    console.error("Errore nel checkout:", error);
  }
};

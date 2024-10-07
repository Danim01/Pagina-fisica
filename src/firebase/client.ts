import { initializeApp } from "firebase/app";

// Credenciales de firebase para conectar desde el cliente
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FB_APIKEY,
  authDomain: import.meta.env.PUBLIC_FB_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FB_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FB_APP_ID
};

// Inicializamos la app con las credenciales
const app = initializeApp(firebaseConfig);

export { app };
import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";

// La función getApps entrega un arreglo de las aplicaciones que ya están inicializadas
const activeApps = getApps();
// Estas son las credenciales para tener acceso ilimitado a las servicios
// de firebase en la aplicación
const serviceAccount = {
  type: "service_account",
  project_id: import.meta.env.PUBLIC_FB_PROJECT_ID,
  private_key_id: import.meta.env.FB_PRIVATE_KEY_ID,
  private_key: import.meta.env.FB_PRIVATE_KEY,
  client_email: import.meta.env.FB_CLIENT_EMAIL,
  client_id: import.meta.env.FB_CLIENT_ID,
  auth_uri: import.meta.env.FB_AUTH_URI,
  token_uri: import.meta.env.FB_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env.FB_AUTH_CERT_URL,
  client_x509_cert_url: import.meta.env.FB_CLIENT_CERT_URL,
};

const initApp = () => {
  // El cert es una función que valida el objeto de credenciales
  return initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
  })
}

// Si nos damos cuenta que activeApps no tiene aplicaciones inicializamos una
// sino utilizamos la que ya esta creada 
export const app = activeApps.length === 0 ? initApp() : activeApps[0];
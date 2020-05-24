import envalid from "envalid";

const { str } = envalid;

export default envalid.cleanEnv(process.env, {
  HYDRA_OAUTH2_INTROSPECT_URL: str({ devDefault: "http://hydra:4445/oauth2/introspect" }),
  FIREBASE_DATABASE_URL: str({ devDefault: "https://<DATABASE_NAME>.firebaseio.com" }),
  GOOGLE_APPLICATION_CREDENTIALS: str({ devDefault: "./serviceAccountKey.json" }),
}, {
  dotEnvPath: null
});

declare module "app-env" {
  interface ENV {
    VITE_API_ENDPOINT: string;
  }

  const appEnv: ENV;
  export default appEnv;
}

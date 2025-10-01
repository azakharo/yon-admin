/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string | undefined;
  readonly VITE_PUBLIC_PATH: string | undefined;
  readonly VITE_APP_VERSION: string;
  readonly VITE_ENABLED_API_PROXYING: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

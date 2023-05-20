/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string,
    readonly VITE_ENV: 'development | production',
    readonly VITE_OPEN: boolean,
    readonly VITE_PORT: number,
    readonly VITE_PATH: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

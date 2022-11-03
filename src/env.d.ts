/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_TAG_PREFIX: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

// noinspection JSUnusedGlobalSymbols

declare global {
  declare module 'express-session' {
    interface SessionData {
      userId?: number;
    }
  }
}

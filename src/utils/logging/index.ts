export const Logger = {
    Dev: {
        info(...args: any[]) {
            if (!import.meta.env.DEV) return
            console.info(...args)
        },
        log(...args: any[]) {
            if (!import.meta.env.DEV) return
            console.log(...args)
        },
        warn(...args: any[]) {
            if (!import.meta.env.DEV) return
            console.warn(...args)
        },
        error(...args: any[]) {
            if (!import.meta.env.DEV) return
            console.error(...args)
        },
    },
    Prod: {
        info: console.info,
        log: console.log,
        warn: console.warn,
        error: console.error,
    },
}

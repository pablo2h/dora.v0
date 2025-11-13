export const enablePlaytime = process.env.NEXT_PUBLIC_FEATURE_PLAYTIME === 'true'
export const defaultEvent = process.env.NEXT_PUBLIC_DEFAULT_EVENT || ''
export const enableClientBackup = process.env.NEXT_PUBLIC_ENABLE_CLIENT_BACKUP !== 'false'
export const enableServerBackup = process.env.NEXT_PUBLIC_ENABLE_SERVER_BACKUP === 'true'

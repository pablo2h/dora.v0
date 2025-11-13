import { EventConfig } from './types'
import { edicionGrooveConfig } from './ediciongroove/config'
import { playtimeConfig } from './playtime/config'

const events: Record<string, EventConfig> = {
  [edicionGrooveConfig.slug]: edicionGrooveConfig,
  [playtimeConfig.slug]: playtimeConfig
}

export function getEvent(slug: string): EventConfig | undefined {
  return events[slug]
}

export function listEvents(): EventConfig[] {
  return Object.values(events)
}

export { events }


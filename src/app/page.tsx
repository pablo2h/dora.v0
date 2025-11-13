import { redirect } from 'next/navigation'
import { defaultEvent } from '@/config/featureFlags'

export default function RootPage() {
  if (defaultEvent) {
    redirect(`/${defaultEvent}`)
  }
  redirect('/bienvenida')
}

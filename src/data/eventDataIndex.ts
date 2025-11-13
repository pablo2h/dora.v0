export interface EventDataIndex {
+  slug: string
+  name: string
+  hero?: {
+    title?: string
+    subtitle?: string
+    backgroundImage?: string
+    logoImage?: string
+    ctaText?: string
+    ctaUrl?: string
+  }
+  welcome?: {
+    title?: string
+    date?: string
+    location?: string
+    logoSrc?: string
+    redirectTo?: string
+  }
+  artists?: Array<{
+    id: number | string
+    name: string
+    description?: string
+    image?: string
+    instagram?: string
+    spotifyId?: string
+    youtubeId?: string
+  }>
+  decorations?: Array<{
+    src: string
+    alt: string
+    position?: 'top' | 'left' | 'right' | 'bottom'
+  }>
+  sections?: {
+    showHero?: boolean
+    showWelcome?: boolean
+    showArtists?: boolean
+    showDecorations?: boolean
+    order?: ('hero' | 'welcome' | 'artists' | 'decorations')[]
+  }
+  emptyState?: {
+    title?: string
+    message?: string
+    placeholderImage?: string
+  }
+}
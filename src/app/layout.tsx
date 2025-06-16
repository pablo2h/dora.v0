// Este layout raíz es mínimo para evitar conflictos con los Route Groups
// Los layouts específicos están en (conNavbar) y (sinNavbar)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
import './globals.css'

export const metadata = {
  title: 'Validador de Ideas',
  description: 'Creado con IA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

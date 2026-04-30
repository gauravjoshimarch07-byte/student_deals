import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2 style={{ fontSize: '30px', color: '#ff4500' }}>Deal Not Found!</h2>
      <p>Oops! This deal might have expired or the page doesn't exist.</p>
      <Link href="/" style={{ color: '#ff4500', fontWeight: 'bold', textDecoration: 'underline' }}>
        Go back to Home for latest deals
      </Link>
    </div>
  )
}
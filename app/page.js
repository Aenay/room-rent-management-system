import Link from 'next/link';

export default function Home() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', background: 'linear-gradient(to right, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
        Find Your Perfect Room
      </h1>
      <p style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '2.5rem', color: 'var(--secondary-foreground)' }}>
        Discover comfortable, affordable, and conveniently located rooms for rent. Browse our curated listings and find your next home today.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/rooms" className="btn btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
          Browse Listings
        </Link>
        <Link href="/rooms/new" className="btn btn-secondary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
          Post a Room
        </Link>
      </div>
    </div>
  );
}

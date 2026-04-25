import Link from 'next/link';
import { Building2, PlusCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link href="/" className="navbar-logo">
          <Building2 size={24} />
          RoomRent
        </Link>
        <div className="navbar-links">
          <Link href="/rooms" className="navbar-link">
            Browse Rooms
          </Link>
          <Link href="/rooms/new" className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <PlusCircle size={18} />
            Post a Room
          </Link>
        </div>
      </div>
    </nav>
  );
}

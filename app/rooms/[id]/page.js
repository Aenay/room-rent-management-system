'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Phone, ArrowLeft, Edit, Trash2 } from 'lucide-react';

export default function RoomDetail({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        if (!res.ok) throw new Error('Room not found');
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this room?')) return;
    try {
      const res = await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      router.push('/rooms');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4" style={{ color: 'var(--accent)' }}>{error}</div>;
  if (!room) return null;

  const formattedPrice = new Intl.NumberFormat('th-TH').format(room.price);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link href="/rooms" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary-foreground)', fontWeight: '500' }}>
          <ArrowLeft size={16} /> Back to Rooms
        </Link>
      </div>

      <div style={{ backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={room.image} alt={room.name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
        
        <div style={{ padding: '2rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 style={{ margin: 0 }}>{room.name}</h1>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
              {formattedPrice} <span style={{ fontSize: '1rem', color: 'var(--secondary-foreground)', fontWeight: '500' }}>THB/mo</span>
            </div>
          </div>

          <div className="flex items-center gap-4" style={{ color: 'var(--secondary-foreground)', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div className="flex items-center gap-2">
              <MapPin size={18} /> {room.location}
            </div>
            {room.contact && (
              <div className="flex items-center gap-2">
                <Phone size={18} /> {room.contact}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.125rem' }}>Description</h3>
            <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7' }}>{room.description || 'No description available.'}</p>
          </div>

          <div className="flex gap-4" style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            <Link href={`/rooms/${id}/edit`} className="btn btn-primary flex items-center gap-2">
              <Edit size={16} /> Edit Room
            </Link>
            <button onClick={handleDelete} className="btn btn-danger flex items-center gap-2">
              <Trash2 size={16} /> Delete Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

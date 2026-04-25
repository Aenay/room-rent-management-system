'use client';
import { useState, useEffect } from 'react';
import RoomCard from '@/components/RoomCard';
import SearchFilter from '@/components/SearchFilter';

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRooms = async () => {
    setLoading(true);
    setError('');
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (minPrice) queryParams.append('minPrice', minPrice);
      if (maxPrice) queryParams.append('maxPrice', maxPrice);

      const res = await fetch(`/api/rooms?${queryParams.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch rooms');
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      setError('Could not load rooms. Please check your database connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Available Rooms</h1>
      </div>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        onSearch={fetchRooms}
      />

      {loading ? (
        <div className="text-center mt-4" style={{ color: 'var(--secondary-foreground)' }}>Loading rooms...</div>
      ) : error ? (
        <div className="text-center mt-4" style={{ color: 'var(--accent)' }}>{error}</div>
      ) : rooms.length === 0 ? (
        <div className="text-center mt-4" style={{ color: 'var(--secondary-foreground)' }}>No rooms found.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import RoomCard from '@/components/RoomCard';
import SearchFilter from '@/components/SearchFilter';

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 6, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRooms = async (pageToFetch = 1) => {
    setLoading(true);
    setError('');
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (minPrice) queryParams.append('minPrice', minPrice);
      if (maxPrice) queryParams.append('maxPrice', maxPrice);
      queryParams.append('page', pageToFetch);
      queryParams.append('limit', 6);

      const res = await fetch(`/api/rooms?${queryParams.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch rooms');
      const data = await res.json();
      
      // Handle both paginated and unpaginated response formats for backward compatibility during transition
      if (data.data) {
        setRooms(data.data);
        setMeta(data.meta);
      } else {
        setRooms(data);
        setMeta({ total: data.length, page: 1, limit: 6, totalPages: 1 });
      }
    } catch (err) {
      setError('Could not load rooms. Please check your database connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    fetchRooms(1); // Reset to page 1 on new search
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= meta.totalPages) {
      fetchRooms(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
        onSearch={handleSearch}
      />

      {loading ? (
        <div className="text-center mt-4" style={{ color: 'var(--secondary-foreground)' }}>Loading rooms...</div>
      ) : error ? (
        <div className="text-center mt-4" style={{ color: 'var(--accent)' }}>{error}</div>
      ) : rooms.length === 0 ? (
        <div className="text-center mt-4" style={{ color: 'var(--secondary-foreground)' }}>No rooms found.</div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          {/* Pagination Controls */}
          {meta.totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '3rem', paddingBottom: '2rem' }}>
              <button 
                className="btn btn-secondary" 
                disabled={meta.page <= 1}
                onClick={() => handlePageChange(meta.page - 1)}
                style={{ opacity: meta.page <= 1 ? 0.5 : 1, cursor: meta.page <= 1 ? 'not-allowed' : 'pointer' }}
              >
                Previous
              </button>
              
              <span style={{ fontSize: '0.875rem', color: 'var(--secondary-foreground)', fontWeight: '500' }}>
                Page {meta.page} of {meta.totalPages}
              </span>
              
              <button 
                className="btn btn-secondary" 
                disabled={meta.page >= meta.totalPages}
                onClick={() => handlePageChange(meta.page + 1)}
                style={{ opacity: meta.page >= meta.totalPages ? 0.5 : 1, cursor: meta.page >= meta.totalPages ? 'not-allowed' : 'pointer' }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

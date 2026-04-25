'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RoomForm({ initialData = null, isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    price: initialData?.price || '',
    location: initialData?.location || '',
    image: initialData?.image || '',
    description: initialData?.description || '',
    contact: initialData?.contact || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEdit ? `/api/rooms/${initialData.id}` : '/api/rooms';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price, 10),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      const result = await res.json();
      router.push(`/rooms/${result.id || initialData.id}`);
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'var(--card)', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
      {error && <div style={{ color: 'white', backgroundColor: 'var(--accent)', padding: '1rem', borderRadius: 'var(--radius)', marginBottom: '1.5rem' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label" htmlFor="name">Room Name *</label>
          <input required type="text" id="name" name="name" className="input-field" value={formData.name} onChange={handleChange} placeholder="e.g. Modern Studio near BTS" />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="input-group" style={{ flex: 1 }}>
            <label className="input-label" htmlFor="price">Price (THB/mo) *</label>
            <input required type="number" id="price" name="price" className="input-field" value={formData.price} onChange={handleChange} placeholder="e.g. 5000" min="0" />
          </div>

          <div className="input-group" style={{ flex: 1 }}>
            <label className="input-label" htmlFor="location">Location *</label>
            <input required type="text" id="location" name="location" className="input-field" value={formData.location} onChange={handleChange} placeholder="e.g. Sukhumvit, Bangkok" />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="image">Image URL *</label>
          <input required type="url" id="image" name="image" className="input-field" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg" />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="contact">Contact Information</label>
          <input type="text" id="contact" name="contact" className="input-field" value={formData.contact} onChange={handleChange} placeholder="e.g. 099-999-9999 or Line ID" />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="description">Description</label>
          <textarea id="description" name="description" className="input-field" value={formData.description} onChange={handleChange} placeholder="Describe the room, facilities, rules, etc." rows="4" style={{ resize: 'vertical' }} />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1 }}>
            {loading ? 'Saving...' : isEdit ? 'Update Room' : 'Post Room'}
          </button>
          <Link href={isEdit ? `/rooms/${initialData.id}` : '/rooms'} className="btn btn-secondary" style={{ flex: 1, textAlign: 'center' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

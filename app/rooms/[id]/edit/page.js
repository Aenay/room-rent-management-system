import RoomForm from '@/components/RoomForm';
import pool from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function EditRoomPage({ params }) {
  const { id } = await params;
  
  let room = null;
  try {
    const [rows] = await pool.query('SELECT * FROM rooms WHERE id = ?', [id]);
    if (rows.length > 0) {
      room = rows[0];
    }
  } catch (error) {
    console.error('Failed to fetch room for editing:', error);
  }

  if (!room) {
    notFound();
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
        <h1>Edit Room: {room.name}</h1>
      </div>
      <RoomForm initialData={room} isEdit={true} />
    </div>
  );
}

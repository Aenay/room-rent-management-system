import RoomForm from '@/components/RoomForm';

export default function NewRoomPage() {
  return (
    <div className="animate-fade-in">
      <div className="page-header" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
        <h1>Post a New Room</h1>
      </div>
      <RoomForm />
    </div>
  );
}

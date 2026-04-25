import Link from 'next/link';
import { MapPin } from 'lucide-react';
import styles from './RoomCard.module.css';

export default function RoomCard({ room }) {
  // Format price with commas
  const formattedPrice = new Intl.NumberFormat('th-TH').format(room.price);

  return (
    <Link href={`/rooms/${room.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={room.image} alt={room.name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{room.name}</h3>
        <div className={styles.location}>
          <MapPin size={16} />
          {room.location}
        </div>
        <div className={styles.footer}>
          <div>
            <span className={styles.price}>{formattedPrice}</span>
            <span className={styles.currency}> THB/mo</span>
          </div>
          <span className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>View Details</span>
        </div>
      </div>
    </Link>
  );
}

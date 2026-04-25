'use client';
import { Search, DollarSign } from 'lucide-react';
import styles from './SearchFilter.module.css';

export default function SearchFilter({ search, setSearch, minPrice, setMinPrice, maxPrice, setMaxPrice, onSearch }) {
  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Location or Name</label>
        <div className={styles.inputWrapper}>
          <Search size={16} className={styles.icon} />
          <input
            type="text"
            className={styles.input}
            placeholder="e.g. Bangkok, Sukhumvit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Min Price (THB)</label>
        <div className={styles.inputWrapper}>
          <DollarSign size={16} className={styles.icon} />
          <input
            type="number"
            className={styles.input}
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Max Price (THB)</label>
        <div className={styles.inputWrapper}>
          <DollarSign size={16} className={styles.icon} />
          <input
            type="number"
            className={styles.input}
            placeholder="Any"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button className="btn btn-primary" onClick={onSearch} style={{ height: '44px', padding: '0 2rem' }}>
          Search
        </button>
      </div>
    </div>
  );
}

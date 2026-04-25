import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'RoomRent | Premium Room Rentals',
  description: 'Find your perfect room to rent with RoomRent.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const sampleRooms = [
  {
    name: "Modern Studio near BTS",
    price: 8500,
    location: "Sukhumvit, Bangkok",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    description: "A beautiful, newly renovated studio apartment just 5 mins walk to BTS. Fully furnished with high-speed internet included. Perfect for young professionals.",
    contact: "Line: @modernstudio | Phone: 089-123-4567"
  },
  {
    name: "Cozy 1-Bedroom Apartment",
    price: 12000,
    location: "Ari, Bangkok",
    image: "https://images.unsplash.com/photo-1502672260266-1c1e52516811?w=800&q=80",
    description: "Spacious 1-bedroom apartment in the heart of Ari. Close to cafes, restaurants, and the BTS. Building features a pool and gym.",
    contact: "Email: contact@ari-apartments.com"
  },
  {
    name: "Affordable Student Room",
    price: 4500,
    location: "Rangsit, Pathum Thani",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
    description: "Budget-friendly room ideal for students. Includes basic furniture, AC, and en-suite bathroom. Located near the university campus.",
    contact: "Phone: 081-987-6543"
  },
  {
    name: "Luxury Condo with City View",
    price: 25000,
    location: "Sathorn, Bangkok",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80",
    description: "Premium condo unit offering stunning city views. Fully equipped modern kitchen, high-end furniture, and top-tier building amenities.",
    contact: "Phone: 080-000-0000"
  },
  {
    name: "Minimalist Loft Room",
    price: 9500,
    location: "Thong Lo, Bangkok",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    description: "Trendy loft-style room in the upscale Thong Lo neighborhood. High ceilings, exposed brick walls, and plenty of natural light.",
    contact: "Line: @minimalistloft"
  },
  {
    name: "Riverside 2-Bedroom Condo",
    price: 35000,
    location: "Charoen Nakhon, Bangkok",
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80",
    description: "Spacious 2-bedroom condo right by the Chao Phraya River. Enjoy breathtaking sunset views from your private balcony. Resort-style amenities included.",
    contact: "Phone: 082-222-3333"
  },
  {
    name: "Budget Backpacker Room",
    price: 3000,
    location: "Khao San Road, Bangkok",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
    description: "Simple, clean room for travelers on a tight budget. Shared bathroom and communal kitchen. Very close to major tourist attractions.",
    contact: "Email: stay@khaosanbudget.com"
  },
  {
    name: "Spacious Family House",
    price: 45000,
    location: "Ekkamai, Bangkok",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    description: "A beautiful 3-bedroom townhouse suitable for families. Comes with a private garden, 2 parking spots, and is pet-friendly.",
    contact: "Phone: 083-444-5555"
  },
  {
    name: "Quiet Suburban Room",
    price: 5500,
    location: "Nonthaburi",
    image: "https://images.unsplash.com/photo-1522771731535-64903e1e8b99?w=800&q=80",
    description: "Peaceful environment away from the city hustle. Large room with a garden view. Perfect for remote workers seeking tranquility.",
    contact: "Line: @quietroom_non"
  },
  {
    name: "Vintage Style Apartment",
    price: 14000,
    location: "Phrom Phong, Bangkok",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
    description: "Charmingly decorated apartment with vintage furniture. Located in a vibrant expat area, just steps away from EmQuartier.",
    contact: "Phone: 084-555-6666"
  },
  {
    name: "Shared Room for Girls",
    price: 2500,
    location: "Ladprao, Bangkok",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
    description: "A safe and comfortable shared room (2 beds) for female students/workers. Close to MRT Ladprao. Utilities included.",
    contact: "Line: @girlsroomladprao"
  },
  {
    name: "High-Rise Penthouse Suite",
    price: 85000,
    location: "Silom, Bangkok",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    description: "Ultimate luxury living. A massive penthouse with panoramic views of the city skyline, private pool, and 24/7 concierge service.",
    contact: "Email: luxury@silomestates.com"
  },
  {
    name: "Smart Home Studio",
    price: 11000,
    location: "On Nut, Bangkok",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
    description: "Fully integrated smart room. Control lights, AC, and curtains with your voice. Modern design and highly convenient location.",
    contact: "Phone: 085-666-7777"
  },
  {
    name: "Eco-Friendly Bamboo Room",
    price: 6000,
    location: "Chiang Mai",
    image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?w=800&q=80",
    description: "Stay close to nature in this beautifully crafted bamboo room. Solar-powered and environmentally conscious design.",
    contact: "Line: @ecostaycm"
  },
  {
    name: "Boutique Hotel Room (Monthly)",
    price: 18000,
    location: "Nimman, Chiang Mai",
    image: "https://images.unsplash.com/photo-1598928506311-c55dd1045a76?w=800&q=80",
    description: "Enjoy hotel living on a monthly basis. Maid service twice a week, access to rooftop pool and co-working space.",
    contact: "Phone: 053-123-456"
  },
  {
    name: "Seaview Studio Apartment",
    price: 15000,
    location: "Pattaya",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
    description: "Wake up to the sound of waves. Fully furnished studio with a direct view of the beach. Complex has a huge pool and gym.",
    contact: "Email: stay@pattayaseaview.com"
  },
  {
    name: "Cozy Room near University",
    price: 5000,
    location: "Salaya, Nakhon Pathom",
    image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80",
    description: "Perfect for Mahidol University students. Quiet environment, fast WiFi, and a dedicated study desk.",
    contact: "Phone: 086-777-8888"
  },
  {
    name: "Industrial Chic Apartment",
    price: 13500,
    location: "Asoke, Bangkok",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
    description: "A uniquely designed apartment featuring concrete walls and metal fixtures. Centrally located with easy access to both BTS and MRT.",
    contact: "Line: @asokeindustrial"
  },
  {
    name: "Pet-Friendly Garden Room",
    price: 8000,
    location: "Bang Na, Bangkok",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    description: "Bring your furry friends! This room comes with a small private yard area for pets. Near Mega Bangna.",
    contact: "Phone: 087-888-9999"
  },
  {
    name: "Classic Thai Wooden House Room",
    price: 7000,
    location: "Ayutthaya",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
    description: "Experience traditional Thai living. A room in a beautifully preserved wooden house along the river. Very authentic and peaceful.",
    contact: "Email: classic@ayutthayahomes.com"
  }
];

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'room_rent_db',
    port: process.env.DB_PORT || 3306,
    ssl: process.env.DB_HOST?.includes('tidbcloud.com') ? {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    } : undefined
  });

  try {
    console.log('Ensuring rooms table exists...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS rooms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price INT NOT NULL,
        location VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT,
        contact VARCHAR(100)
      );
    `);

    console.log('Clearing existing rooms...');
    await connection.query('TRUNCATE TABLE rooms');

    console.log('Inserting sample rooms...');
    for (const room of sampleRooms) {
      await connection.query(
        `INSERT INTO rooms (name, price, location, image, description, contact) VALUES (?, ?, ?, ?, ?, ?)`,
        [room.name, room.price, room.location, room.image, room.description, room.contact]
      );
    }
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await connection.end();
  }
}

seed();

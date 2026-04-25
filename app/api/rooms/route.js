import pool from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const minPrice = searchParams.get("minPrice") || 0;
    const maxPrice = searchParams.get("maxPrice") || 999999999;

    const [rows] = await pool.query(
      `SELECT * FROM rooms
       WHERE (name LIKE ? OR location LIKE ?)
       AND price BETWEEN ? AND ?
       ORDER BY id DESC`,
      [`%${search}%`, `%${search}%`, minPrice, maxPrice]
    );

    return Response.json(rows);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return Response.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, price, location, image, description, contact } = body;

    if (!name || !price || !location || !image) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [result] = await pool.query(
      `INSERT INTO rooms (name, price, location, image, description, contact)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, price, location, image, description || '', contact || '']
    );

    return Response.json({ id: result.insertId, ...body }, { status: 201 });
  } catch (error) {
    console.error('Error creating room:', error);
    return Response.json({ error: 'Failed to create room' }, { status: 500 });
  }
}

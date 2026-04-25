import pool from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    const [rows] = await pool.query('SELECT * FROM rooms WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return Response.json({ error: 'Room not found' }, { status: 404 });
    }
    
    return Response.json(rows[0]);
  } catch (error) {
    console.error('Error fetching room:', error);
    return Response.json({ error: 'Failed to fetch room' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, price, location, image, description, contact } = body;

    const [result] = await pool.query(
      `UPDATE rooms 
       SET name = COALESCE(?, name), 
           price = COALESCE(?, price), 
           location = COALESCE(?, location), 
           image = COALESCE(?, image), 
           description = COALESCE(?, description), 
           contact = COALESCE(?, contact)
       WHERE id = ?`,
      [name, price, location, image, description, contact, id]
    );

    if (result.affectedRows === 0) {
      return Response.json({ error: 'Room not found' }, { status: 404 });
    }

    return Response.json({ success: true, id });
  } catch (error) {
    console.error('Error updating room:', error);
    return Response.json({ error: 'Failed to update room' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const [result] = await pool.query('DELETE FROM rooms WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return Response.json({ error: 'Room not found' }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting room:', error);
    return Response.json({ error: 'Failed to delete room' }, { status: 500 });
  }
}

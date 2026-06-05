import * as SQLite from 'expo-sqlite';

let dbInstance = null;

export async function getDB() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('doemais.db');
    await dbInstance.execAsync(`
      CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        donor_name TEXT NOT NULL,
        contact TEXT NOT NULL,
        city TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }
  return dbInstance;
}

export async function createDonation(d) {
  const db = await getDB();
  const r = await db.runAsync(
    'INSERT INTO donations (title, description, category, donor_name, contact, city) VALUES (?,?,?,?,?,?)',
    [d.title, d.description, d.category, d.donor_name, d.contact, d.city]
  );
  return r.lastInsertRowId;
}

export async function listDonations(category) {
  const db = await getDB();
  if (category && category !== 'Todas') {
    return db.getAllAsync('SELECT * FROM donations WHERE category = ? ORDER BY id DESC', [category]);
  }
  return db.getAllAsync('SELECT * FROM donations ORDER BY id DESC');
}

export async function getDonation(id) {
  const db = await getDB();
  return db.getFirstAsync('SELECT * FROM donations WHERE id = ?', [id]);
}

export async function updateDonation(id, d) {
  const db = await getDB();
  await db.runAsync(
    'UPDATE donations SET title=?, description=?, category=?, donor_name=?, contact=?, city=? WHERE id=?',
    [d.title, d.description, d.category, d.donor_name, d.contact, d.city, id]
  );
}

export async function deleteDonation(id) {
  const db = await getDB();
  await db.runAsync('DELETE FROM donations WHERE id = ?', [id]);
}

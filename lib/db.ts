import { sql } from "@vercel/postgres";

let initialized = false;

async function initDb() {
  if (initialized) return;

  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT DEFAULT '',
      company TEXT DEFAULT '',
      role TEXT NOT NULL,
      message TEXT DEFAULT '',
      role_specific_data TEXT DEFAULT '{}',
      is_read INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  initialized = true;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  message: string;
  role_specific_data: string;
  is_read: number;
  created_at: string;
}

export async function insertContact(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role: string;
  message?: string;
  roleSpecificData?: Record<string, string>;
}): Promise<Contact> {
  await initDb();

  const result = await sql`
    INSERT INTO contacts (name, email, phone, company, role, message, role_specific_data)
    VALUES (
      ${data.name},
      ${data.email},
      ${data.phone || ""},
      ${data.company || ""},
      ${data.role},
      ${data.message || ""},
      ${JSON.stringify(data.roleSpecificData || {})}
    )
    RETURNING *
  `;

  return result.rows[0] as Contact;
}

export async function getAllContacts(): Promise<Contact[]> {
  await initDb();

  const result = await sql`
    SELECT * FROM contacts ORDER BY created_at DESC
  `;

  return result.rows as Contact[];
}

export async function getContactById(
  id: number
): Promise<Contact | undefined> {
  await initDb();

  const result = await sql`
    SELECT * FROM contacts WHERE id = ${id}
  `;

  return result.rows[0] as Contact | undefined;
}

export async function markAsRead(id: number): Promise<boolean> {
  await initDb();

  const result = await sql`
    UPDATE contacts SET is_read = 1 WHERE id = ${id}
  `;

  return (result.rowCount ?? 0) > 0;
}

export async function getStats() {
  await initDb();

  const totalResult = await sql`SELECT COUNT(*) as count FROM contacts`;
  const total = Number(totalResult.rows[0].count);

  const unreadResult = await sql`SELECT COUNT(*) as count FROM contacts WHERE is_read = 0`;
  const unread = Number(unreadResult.rows[0].count);

  const todayResult = await sql`SELECT COUNT(*) as count FROM contacts WHERE created_at::date = CURRENT_DATE`;
  const today = Number(todayResult.rows[0].count);

  const rolesResult = await sql`SELECT DISTINCT role FROM contacts`;
  const uniqueRoles = rolesResult.rows.length;

  return {
    total,
    unread,
    today,
    uniqueRoles,
  };
}

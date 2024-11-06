export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
}

const baseUrl = "http://localhost:5500"

export async function getContacts(search: string): Promise<Contact[]> {
  const response = await fetch(baseUrl + `?search=${search}`)
  const { contacts }: { contacts: Contact[] } = await response.json();
  return contacts;
}
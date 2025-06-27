export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  isFavorite: boolean;
};

export type ContactData = Omit<Contact, "id">;

const baseUrl = "http://localhost:5500";

export async function getContacts(search: string): Promise<Contact[]> {
  const response = await fetch(baseUrl + `?search=${search}`);
  const { contacts }: { contacts: Contact[] } = await response.json();
  return contacts;
}

export async function getFavorites(): Promise<Contact[]> {
  const response = await fetch(baseUrl + "/favorites");
  const { contacts }: { contacts: Contact[] } = await response.json();
  return contacts;
}

export async function createContact(
  contactData: ContactData
): Promise<Contact> {
  const response = await fetch(baseUrl + "/contacts", {
    method: "POST",
    body: JSON.stringify(contactData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { contact }: { contact: Contact } = await response.json();
  return contact;
}

export async function toggleFavorite(id: Contact["id"]): Promise<Contact> {
  const response = await fetch(baseUrl + `/contacts/${id}/toggle-favorite`, {
    method: "POST",
  });
  const { contact }: { contact: Contact } = await response.json();
  return contact;
}

export async function getContact(id: Contact["id"]): Promise<Contact> {
  const response = await fetch(baseUrl + `/contacts/${id}`);
  const { contact }: { contact: Contact } = await response.json();
  return contact;
}

export async function updateContact(
  id: Contact["id"],
  contactData: ContactData
): Promise<Contact> {
  const response = await fetch(baseUrl + `/contacts/${id}`, {
    method: "PUT",
    body: JSON.stringify(contactData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { contact }: { contact: Contact } = await response.json();
  return contact;
}

export async function deleteContact(id: Contact["id"]): Promise<void> {
  await fetch(baseUrl + `/contacts/${id}`, {
    method: "DELETE",
  });
}

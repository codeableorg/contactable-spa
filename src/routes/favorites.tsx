import { LoaderFunction, useLoaderData, Form } from "react-router-dom";
import Contact from "../components/contact";
import { type Contact as ContactType, getFavorites } from "../contacts";

export const loader: LoaderFunction = async () => {
  const contacts = await getFavorites();
  return { contacts };
};

export default function Favorites() {
  const { contacts } = useLoaderData() as {
    contacts: ContactType[];
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Favorite Contacts</h1>

      {contacts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No contacts found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {contacts.map((contact) => {
            return <Contact key={contact.id} contact={contact} />;
          })}
        </div>
      )}
    </>
  );
}

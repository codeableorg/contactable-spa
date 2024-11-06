import { LoaderFunction, useLoaderData, Form } from "react-router-dom";
import Contact from "../components/contact";
import { type Contact as ContactType, getContacts } from "../contacts";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") || "";
  const contacts = await getContacts(search);
  return { contacts, search };
};

export default function Index() {
  const { contacts, search } = useLoaderData() as {
    search: string;
    contacts: ContactType[];
  };

  return (
    <>
      <div className="mb-6">
        <Form action="/" method="GET" className="flex gap-2">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search contacts..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-600/90"
          >
            Search
          </button>
        </Form>
      </div>

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

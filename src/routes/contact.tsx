/* eslint-disable react-refresh/only-export-components */
import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "react-router-dom";
import {
  type Contact,
  getContact,
  updateContact,
  deleteContact,
} from "../contacts";

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id as string;
  const contact = await getContact(id);

  return { contact };
};

export const action: ActionFunction = async ({ request, params }) => {
  const id = params.id as string;
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    await deleteContact(id);
    return redirect("/");
  }

  const updates = Object.fromEntries(formData) as unknown as Contact;
  await updateContact(id, updates);

  return redirect("/");
};

export default function Contact() {
  const error = null;
  const { contact } = useLoaderData() as { contact: Contact };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Contact</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <Form
        action={`/contacts/${contact.id}`}
        method="POST"
        className="space-y-4"
      >
        <div>
          <label className="block text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            required
            className="w-full p-2 border rounded-lg"
            defaultValue={contact.firstName || ""}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            required
            className="w-full p-2 border rounded-lg"
            defaultValue={contact.lastName || ""}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full p-2 border rounded-lg"
            defaultValue={contact.email || ""}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">
            Avatar URL (optional)
          </label>
          <input
            type="url"
            name="avatarUrl"
            className="w-full p-2 border rounded-lg"
            defaultValue={contact.avatarUrl || ""}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-600/90"
          >
            Save Changes
          </button>
          <Link
            to="/"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </Link>
        </div>
      </Form>

      <Form
        action={`/contacts/${contact.id}`}
        method="POST"
        className="mt-8"
        onSubmit={(e) => {
          if (
            !window.confirm("Are you sure you want to delete this contact?")
          ) {
            e.preventDefault();
          }
        }}
      >
        <input type="hidden" name="intent" value="delete" />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Delete Contact
        </button>
      </Form>
    </div>
  );
}

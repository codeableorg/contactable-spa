import { useFetcher } from "react-router-dom";
import { type Contact } from "../contacts";

export default function Contact({ contact }: { contact: Contact }) {
  const fetcher = useFetcher();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={
            contact.avatarUrl ||
            `https://robohash.org/${contact.firstName}+${contact.lastName}.png?set=set3`
          }
          alt={`${contact.firstName} ${contact.lastName}`}
          className="w-12 h-12 rounded-full bg-gray-100"
        />
        <a href={`/contacts/${contact.id}`} className="hover:text-indigo-600">
          {contact.firstName} {contact.lastName}
        </a>
      </div>
      <fetcher.Form
        action={`/contacts/${contact.id}/toggle-favorite`}
        method="POST"
      >
        <button
          type="submit"
          className="text-yellow-500 flex justify-center items-center pb-1 text-3xl"
        >
          {contact.isFavorite ? "★" : "☆"}
        </button>
      </fetcher.Form>
    </div>
  );
}

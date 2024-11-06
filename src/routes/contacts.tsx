import { ActionFunction, redirect } from "react-router-dom";
import { ContactData, createContact } from "../contacts";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData) as unknown as ContactData;
  await createContact(updates);
  return redirect("/");
};

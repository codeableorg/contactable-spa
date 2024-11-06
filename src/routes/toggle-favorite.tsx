import { ActionFunction } from "react-router-dom";
import { toggleFavorite } from "../contacts";

export const action: ActionFunction = async ({ params }) => {
  const id = params.id as string;
  const contact = await toggleFavorite(id);
  return { contact };
};

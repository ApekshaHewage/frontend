import axios from "axios";
import { useQuery } from "react-query";

const fetchItem = (itemId) =>
  axios
    .get(`http://localhost:4000/item/${itemId}`)
    .then((response) => response.data);

export default function useItem(itemId) {
  return useQuery(["items", itemId], () => fetchItem(itemId));
}

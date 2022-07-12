import axios from "axios";
import { useQuery } from "react-query";

const fetchItems = () =>
  axios.get("http://localhost:4000/items").then((response) => response.data);

export default function useItems() {
  return useQuery("items", fetchItems);
}

import axios from "axios";
import { useQuery } from "react-query";

const fetchItems = () =>
  axios
    .get("http://localhost:4000/categorys")
    .then((response) => response.data);

export default function useCatogaries() {
  return useQuery("categories", fetchItems);
}

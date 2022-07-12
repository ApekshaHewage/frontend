import axios from "axios";
import { useQuery } from "react-query";

// http://localhost:4000/category/places

const fetchItem = (slug) =>
  axios
    .get(`http://localhost:4000/category/${slug}`)
    .then((response) => response.data);

export default function useCategory(slug) {
  return useQuery(["categories", slug], () => fetchItem(slug));
}

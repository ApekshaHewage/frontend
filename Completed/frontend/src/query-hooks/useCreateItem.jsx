import { useMutation, useQueryClient } from "react-query";

const createItem = async (info) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: info.id,
    title: info?.title,
    serviceTime: info?.serviceTime,
    deliveryFee: info?.deliveryFee,
    category: info?.category,
    cuisine: info?.cuisine,
    rating: info?.rating,
    price: info?.price,
    coverSrc: info?.coverSrc,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:4000/items/create", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result?.Error) {
        throw new Error(result?.Error);
      }
      return result;
    });
};

export function useCreateItem(info) {
  const queryClient = useQueryClient();

  return useMutation((info) => createItem(info), {
    onSuccess: (data) => queryClient.setQueryData("items", data),
  });
}

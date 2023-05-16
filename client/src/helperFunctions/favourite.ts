import { Search } from "../types/types";

export const favouriteHandler = (
  data: Search,
  city: string,
  favourite: boolean,
  setFavourite: React.Dispatch<React.SetStateAction<boolean>>,
  setSearch: React.Dispatch<React.SetStateAction<Search[]>>,
  showWarnMessage: any,
  toast: any,
  showToastMessage: any,
  token: string | undefined
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      ...{ city: city },
      ...data,
      ...{ favourite: !favourite },
    }),
  };
  fetch(`${process.env.REACT_APP_URL}/api/favorites`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.status === "success") {
        setFavourite(true); 
        showToastMessage(toast);
      } else {
        showWarnMessage(toast);
      }
    })
    .finally(() => setSearch([]))
    .catch((err) => console.log(err));
};

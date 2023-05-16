export const removeFav = (
  key: number,
  setDeleteFav: React.Dispatch<React.SetStateAction<boolean>>,
  deleteFav: boolean,
  showDeleteMessage: any,
  toast: any,
  showErrorMessage: any,
  token: string | undefined
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "DELETE",
    headers: headers,
  };
  fetch(`${process.env.REACT_APP_URL}/api/favorites/${key}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.status === "success") {
          setDeleteFav(!deleteFav);
          showDeleteMessage(toast);
      } else {
        showErrorMessage(toast);
      }
    })
    .catch((err) => console.log(err));
};

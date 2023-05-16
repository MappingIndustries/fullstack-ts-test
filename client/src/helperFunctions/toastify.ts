export const showToastMessage = (toast: any) => {
  toast.success("Added to Favourites!", {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};
export const showDeleteMessage = (toast: any) => {
  toast.success("Removed from Favourites!", {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};
export const showWarnMessage = (toast: any) => {
  toast.warn("Already a Favourite!", {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};
export const showErrorMessage = (toast: any) => {
  toast.error("Failed to Remove!", {
    position: toast.POSITION.BOTTOM_CENTER
  });
};

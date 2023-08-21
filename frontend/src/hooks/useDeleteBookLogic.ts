// import { useState } from "react";
import apiClient from "../services/api-client.ts";

const useDeleteBookLogic = () => {
  // const [successDeleting, setSuccessDeleting] = useState(false);
  // const [errorDeleting, setErrorDeleting] = useState(false);

  const deleteBook = (
    id: number,
    onSucess: () => void,
    onError: () => void,
  ) => {
    apiClient
      .delete(`/api/v1/books/${id}`)
      .then((res) => {
        console.log("Book deleted successfully", res.data);
        // setSuccessDeleting(true);
        // setErrorDeleting(false);
        onSucess();
      })
      .catch((err) => {
        console.log("Error deleting book", err);
        // setErrorDeleting(true);
        // setSuccessDeleting(false);
        onError();
      });
  };

  return {
    // successDeleting, errorDeleting,
    deleteBook,
  };
};

export default useDeleteBookLogic;

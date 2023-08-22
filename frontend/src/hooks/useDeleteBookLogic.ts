import apiClient from "../services/api-client.ts";

const useDeleteBookLogic = () => {
  const deleteBook = (
    id: number,
    onSucess: () => void,
    onError: () => void,
  ) => {
    apiClient
      .delete(`/api/v1/books/${id}`)
      .then((res) => {
        console.log("Book deleted successfully", res.data);
        onSucess();
      })
      .catch((err) => {
        console.log("Error deleting book", err);
        onError();
      });
  };

  return {
    deleteBook,
  };
};

export default useDeleteBookLogic;

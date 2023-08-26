import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import BookList from "../components/BookList.tsx";
import SearchInput, { SearchResponse } from "../components/SearchInput.tsx";
import { useState } from "react";
import { BookInterface } from "../components/Book.tsx";
import { AuthTokenInterface } from "../hooks/useToken.ts";
import { NavLink } from "react-router-dom";
import useBookAttributes from "../hooks/useBookAttributes.ts";
import DeleteBook from "../components/DeleteBook.tsx";
import BookForm from "../components/BookForm.tsx";
import emptyBook from "../helper/emptyBook.ts";
import { FiLogOut } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import usePagination from "../hooks/usePagination.ts";
import PaginationList from "../components/PaginationList.tsx";
import apiClient from "../services/api-client.ts";
import { AxiosResponse, CanceledError } from "axios";

const Library = ({ authToken, setAuthToken }: AuthTokenInterface) => {
  const [books, setBooks] = useState<BookInterface[]>([]);
  const bookAttributes = useBookAttributes(authToken);
  const toast = useToast();
  const pagination = usePagination();

  // deleting book
  const [selectedBook, setSelectedBook] = useState<BookInterface | null>(null);
  const {
    isOpen: isOpenDeletingBook,
    onOpen: onOpenDeletingBook,
    onClose: onCloseDeletingBook,
  } = useDisclosure();
  const handleDelete = (book: BookInterface) => {
    setSelectedBook(book);
    onOpenDeletingBook();
  };
  const bookDeleted = (book: BookInterface) => {
    toast({
      title: "Book Deleted!",
      description: `${book.title} is deleted`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setBooks(books.filter((b) => b.id !== book.id));
  };
  // /deleting book

  // new/update book
  const [newBook, setNewBook] = useState<BookInterface>(emptyBook);
  const {
    isOpen: isOpenBookForm,
    onOpen: onOpenBookForm,
    onClose: onCloseBookForm,
  } = useDisclosure();

  const handleBookUpdate = (book: BookInterface) => {
    setNewBook({ ...book });
    onOpenBookForm();
  };
  const bookSaved = (book: BookInterface) => {
    const index = books.findIndex((b) => b.id === book.id);
    if (index < 0) {
      setBooks([book]);
    } else {
      const arr = [...books];
      arr[index] = book;
      setBooks(arr);
    }

    toast({
      title: "Book Saved",
      description: `${book.title} is saved`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setNewBook(emptyBook);
  };

  const handleBookSearch = (searcString: string, page?: number) => {
    const controller = new AbortController();
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

    apiClient
      .get(`/api/v1/search/${searcString}${page ? "?page=" + page : ""}`, {
        signal: controller.signal,
      })
      .then((res: AxiosResponse<SearchResponse>) => {
        pagination.setNumberOfPages(res.data.numberOfPages);
        setBooks(res.data.books);
        pagination.setCurrentPage(res.data.currentPage);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
      });
  };

  return (
    <Container maxW="6xl">
      <BookForm
        isOpen={isOpenBookForm}
        onClose={onCloseBookForm}
        bookAttributes={bookAttributes}
        bookSaved={bookSaved}
        newBook={newBook}
      />
      <DeleteBook
        isOpen={isOpenDeletingBook}
        onClose={onCloseDeletingBook}
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
        bookAttributes={bookAttributes}
        bookDeleted={bookDeleted}
      />

      <Flex>
        <Box flex="1">
          <SearchInput
            onBookSearch={handleBookSearch}
            pagination={pagination}
          />
        </Box>
        <Box ml={2}>
          <Button
            onClick={() => {
              setNewBook(emptyBook);
              onOpenBookForm();
            }}
          >
            <Icon as={AiOutlinePlusCircle} fontSize="24px" />
          </Button>
        </Box>
        <Box ml={2}>
          <Button
            as={NavLink}
            onClick={() => {
              sessionStorage.removeItem("authToken");
              if (setAuthToken) {
                setAuthToken("");
              }
            }}
            to="/"
          >
            {/*NavLink*/}
            <Icon as={FiLogOut} fontSize="24px" />
          </Button>
        </Box>
      </Flex>
      <PaginationList
        pagination={pagination}
        onSelectPage={(pageNumber) =>
          handleBookSearch(pagination.latestSearch, pageNumber)
        }
      />
      <Box>
        <BookList
          bookAttributes={bookAttributes}
          books={books}
          onUpdate={handleBookUpdate}
          onDelete={handleDelete}
        />
      </Box>
    </Container>
  );
};

export default Library;

import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { z } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "../services/api-client.ts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";
import { AuthTokenInterface } from "../hooks/useToken.ts";

const schema = z.object({
  username: z.string().max(50, { message: "Username too long." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

type LoginFormValues = z.infer<typeof schema>;

const Login = ({ setAuthToken }: AuthTokenInterface) => {
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await apiClient.post("/auth/login", {
        username: data.username,
        password: data.password,
      });
      const { token } = response.data;
      if (token) {
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        sessionStorage.setItem("authToken", token);
        if (setAuthToken) {
          setAuthToken(token);
        }
        navigate("/library");
      } else {
        return;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setAuthError(error?.response?.statusText || "");
      } else {
        setAuthError("Something went wrong");
      }
    }
  };

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
      gap={6}
      p={4}
      justifyItems="center"
      alignItems="center"
      height="100vh"
    >
      <GridItem>
        <Text fontSize="5xl" fontWeight="bold" lineHeight="130%">
          Dobrodošli v knjižnici
        </Text>
        <Text mt={5}>
          Tu lahko najdete različne knjige, jih urejate in dodajate nove.
        </Text>
      </GridItem>
      <GridItem border="2px solid #DDD" p="2rem" borderRadius="1rem">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl p="0.5rem">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              {...register("username")}
              placeholder="janezNovak@domain.com"
            />
            {errors.username && (
              <Alert status="error" mt="0.5rem">
                <AlertIcon />
                {errors.username.message}
              </Alert>
            )}
          </FormControl>
          <FormControl p="0.5rem">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password")}
              placeholder="*********"
            />
            {errors.password && (
              <Alert status="error" mt="0.5rem">
                <AlertIcon />
                {errors.password.message}
              </Alert>
            )}
          </FormControl>
          {authError && (
            <Alert status="error" mx="0.5rem">
              <AlertIcon />
              {authError}
            </Alert>
          )}
          <Button colorScheme="blue" type="submit" m="0.5rem">
            Login
          </Button>
        </form>
      </GridItem>
    </Grid>
  );
};

export default Login;

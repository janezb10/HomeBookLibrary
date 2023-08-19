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
  email: z.string().email({ message: "Invalid email address" }),
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
        email: data.email,
        password: data.password,
      });
      const { token } = response.data;
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      sessionStorage.setItem("authToken", token);
      if (setAuthToken) {
        setAuthToken(token);
      }

      navigate("/library");
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
        <Text fontSize="xl" fontWeight="bold">
          Dobrodošli v knjižnici
        </Text>
        <Text>
          Tu lahko najdete različne knjige, jih urejate in dodajate nove.
        </Text>
      </GridItem>
      <GridItem border="2px solid #DDD" p="2rem" borderRadius="1rem">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl p="0.5rem">
            <FormLabel>Email address</FormLabel>
            <Input
              type="text"
              {...register("email")}
              placeholder="janezNovak@domain.com"
            />
            {errors.email && (
              <Alert status="error">
                <AlertIcon />
                {errors.email.message}
              </Alert>
            )}
          </FormControl>
          <FormControl p="0.5rem">
            <FormControl>Password</FormControl>
            <Input
              type="password"
              {...register("password")}
              placeholder="*********"
            />
            {errors.password && (
              <Alert status="error">
                <AlertIcon />
                {errors.password.message}
              </Alert>
            )}
          </FormControl>
          {authError && (
            <Alert status="error">
              <AlertIcon />
              {authError}
            </Alert>
          )}
          <Button colorScheme="teal" variant="outline" type="submit" m="0.5rem">
            Login
          </Button>
        </form>
      </GridItem>
    </Grid>
  );
};

export default Login;

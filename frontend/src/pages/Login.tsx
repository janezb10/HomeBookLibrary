import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { z } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

type LoginFormValues = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" {...register("email")} />
          {errors.email && (
            <Alert status="error">
              <AlertIcon />
              {errors.email.message}
            </Alert>
          )}
        </FormControl>
        <FormControl>
          <FormControl>Password</FormControl>
          <Input type="password" {...register("password")} />
          {errors.password && (
            <Alert status="error">
              <AlertIcon />
              {errors.password.message}
            </Alert>
          )}
        </FormControl>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;

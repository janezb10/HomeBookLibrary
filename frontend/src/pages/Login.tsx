import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const Login = () => {
  return (
    <div>
      <form>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl>
          <FormControl>Password</FormControl>
          <Input type="password" />
        </FormControl>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;

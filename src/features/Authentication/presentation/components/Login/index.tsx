import { Container } from "../../../utils/components/Container";
import { Header } from "../../../utils/components/Header";
import { LoginForm } from "./LoginForm";

export const LogIn = () => {
  return (
    <>
      <Container>
        <Header />
        <LoginForm />
      </Container>
    </>
  );
};

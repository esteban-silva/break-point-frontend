import { Container } from "../../../utils/components/Container";
import { Header } from "../../../utils/components/Header";
import "./index.css";
import { SingUpForm } from "./utils/SignUpForm";

export const SignUp = () => {
  return (
    <>
      <Container>
        <Header />
        <SingUpForm />
      </Container>
    </>
  );
};

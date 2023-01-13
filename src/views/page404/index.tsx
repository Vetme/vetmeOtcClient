import { Container } from "@/components";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 150px;
  width: 100%;
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 60px;
    margin-bottom: 10px;
  }
`;

const Page404 = () => {
  return (
    <Container>
      <Wrapper>
        <h1>404</h1>
        <p>Page Not Found</p>
      </Wrapper>
    </Container>
  );
};

export default Page404;

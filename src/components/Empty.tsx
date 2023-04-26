import React from "react";
import styled from "styled-components";
import { Text } from ".";

const EmptyCon = styled.div`
  height: calc(100vh - 380px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Empty = () => {
  return (
    <EmptyCon>
      <Text>No Listing yet</Text>
      <Text size="s4" sizeM="12px">
        Be the first to list
      </Text>
    </EmptyCon>
  );
};

export default Empty;

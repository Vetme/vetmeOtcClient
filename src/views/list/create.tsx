import { Container, Spacer } from "@/components";
import { List } from "./styles";
import { ListCard } from "@/components/Card";
import { ActionSwitch, ListWrapper, SwitchItem2 } from "../home/styles";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div>
        <ActionSwitch className="list" style={{ margin: "auto" }}>
          <SwitchItem2 onClick={() => navigate("/")}>Swap</SwitchItem2>
          <SwitchItem2
            onClick={() => navigate("/list/create")}
            className="active"
          >
            List
          </SwitchItem2>
        </ActionSwitch>
        <Spacer height={24} />
        <List>
          <ListCard />
        </List>
      </div>
    </Container>
  );
};

export default CreateListing;

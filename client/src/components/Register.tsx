import { Button, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorEl from "./ErrorEl";

export const Register = () => {
  const address = useAddress();
  const { contract } = useContract(address);
  const navigate = useNavigate();

  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "createLesson"
  );

  const [asset, setAsset] = useState({
    name: "",
    notes: "",
  });

  const saveLesson = () => {
    const { name, notes } = asset;
    mutateAsync({
      args: [notes, name],
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <Flex direction="column" mt="6" gap="3" style={{ maxWidth: 450 }}>
      <h1>Add a lesson</h1>
      <ErrorEl error={error}></ErrorEl>
      <div>
        <Text>Lesson name</Text>
        <TextField.Input
          variant="surface"
          size="3"
          value={asset.name}
          onChange={(e) =>
            setAsset((val) => ({ ...val, name: e.target.value }))
          }
          placeholder="name"
        />
      </div>
      <div>
        <Text>Notes</Text>
        <TextArea
          placeholder="write notes…"
          value={asset.notes}
          onChange={(e) =>
            setAsset((val) => ({ ...val, notes: e.target.value }))
          }
        />
      </div>
      <Button onClick={saveLesson}>save {isLoading && "loading..."}</Button>
    </Flex>
  );
};
import { Flex, Text, TextField } from "@radix-ui/themes";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { W3Button } from "./W3Button";

export const Register = ({ name = '',
  notes = '' }) => {
  const navigate = useNavigate();
  const [asset, setAsset] = useState({
    name,
    notes,
  });

  const { id } = useParams();

  const onChange = useCallback((value: string) => {
    setAsset((val) => ({ ...val, notes: value }))
  }, []);

  return (
    <Flex direction="column" mt="6" gap="3" >
      <h1>Add a lesson</h1>
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
        <SimpleMDE
          value={asset.notes} onChange={onChange} />
      </div>
      <W3Button
        action={async (contract) => {
          if (id) {
            contract.call("updateLesson", [id, asset.notes, asset.name]).then(() => { navigate("/"); setAsset({ name: '', notes: '' }) });
          } else {
            contract.call("createLesson", [asset.notes, asset.name]).then(() => { navigate("/"); setAsset({ name: '', notes: '' }) });
          }
        }}
      >
        save
      </W3Button>
    </Flex>
  );
};

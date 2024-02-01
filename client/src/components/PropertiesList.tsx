import { Flex } from "@radix-ui/themes";
import Loading from "./Loading";
import ErrorEl from "./ErrorEl";
import SingleProperty from "./SingleProperty";
import { useLessons } from "../hooks/lesson";
import { useAddress } from "@thirdweb-dev/react";
import Login from "./Login";

export const PropertiesList = () => {
  const { error, isLoading, lessons } = useLessons();
  const address = useAddress();
  if (!address) return <Login />;
  if (isLoading) return <Loading />;
  if (error) return <ErrorEl error={error} />;
  return (
    <>
      <h1>Lessons</h1>
      {
        <Flex my="4" gap="3" wrap="wrap" width="auto">
          {lessons.map((property, i) => (
            <SingleProperty index={i} property={property} key={property.body} />
          ))}
        </Flex>
      }
    </>
  );
};

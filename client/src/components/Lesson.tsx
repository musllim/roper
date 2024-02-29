import { Avatar, Box, Button, Flex, Text } from "@radix-ui/themes";
import { useParams } from "react-router-dom";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useProperty } from "../api/property";
import Loading from "./Loading";
import ErrorEl from "./ErrorEl";
import BadgeList from "./BadgeList";
import LessonNav from "./LessonNav";
import Review from "./Review";
import DeleteCourseButton from "./DeleteCourseBtn";
import { Reviews } from "./Reviews";

const Lesson = () => {
  const { id } = useParams();
  const {
    error,
    isLoading,
    data: { lessons },
  } = useProperty(id);


  if (isLoading) return <Loading />;
  if (error) return <ErrorEl error={error} />;
  const [creator, body, isPublished, title] = lessons;
  return (
    <div>
      <h1>Lesson {id}</h1>
      <LessonNav />
      <Flex gap="3">
        <Avatar size="4" src={creator} fallback="T" />
        <Box>
          <Text mt="2" as="div" size="2" color="gray" weight="bold">
            {title}
          </Text>
          <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
          <Text mt="2" as="div" size="2" color="cyan">
            Created by {creator}
          </Text>
        </Box>
      </Flex>
      <Reviews />
      <BadgeList
        badges={[
          { badge: "social", color: "blue" },
          { badge: "education", color: "gray" },
        ]}
      />

      <Button variant="solid" mt="2">
        add exercise
      </Button>
      <Review />
      <Button variant="solid" mt="2" ml="2">
        publish
      </Button>
      <DeleteCourseButton id={id} />
      {isPublished && (
        <Text mt="2" as="div" size="2" ml="2">
          {24} Enrolled
        </Text>
      )}

      <Button variant="solid" mt="2" ml="2">
        enroll
      </Button>
    </div>
  );
};

export default Lesson;

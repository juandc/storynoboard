import { getStory } from "@/services/getStory";
import { StoryEditContainer } from "@/containers/StoryEditContainer/StoryEditContainer";

export default async function StoryEditPage() {
  const story = await getStory();
  // const frameDict = transformStoryToFramesDict(story);
  // const firstFrameId = story.data.frames[0].id;

  return <StoryEditContainer story={story} />;
}

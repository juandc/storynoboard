import { getStory, transformStoryToFramesDict } from "@/services/getStory";
import { StoryContainer } from "@/containers/StoryContainer/StoryContainer";

export default async function StoryPage() {
  const story = await getStory();
  const frameDict = transformStoryToFramesDict(story);
  const firstFrameId = story.data.frames[0].id;

  return <StoryContainer framesDict={frameDict} firstFrameId={firstFrameId} />;
}

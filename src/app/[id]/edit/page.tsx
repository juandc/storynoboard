import { getStory, transformStoryToFramesDict } from "@/services/getStory";
import { StoryContainer } from "@/containers/StoryContainer/StoryContainer";

export default async function StoryEditPage() {
  const story = await getStory();
  const frameDict = transformStoryToFramesDict(story);
  const firstFrameId = story.data.frames[0].id;

  return (
    <>
      <div style={{ background: "var(--bg-elevated-2)", borderRadius: 12, position: "fixed", top: 8, left: 256 + 8 + 8, right: 8, height: 56 }}>
        TopBar
      </div>
      <div style={{ background: "var(--bg-elevated-2)", borderRadius: 12, position: "fixed", top: 8, bottom: 8, left: 8, height: "calc(100dvh - 8 - 8)", width: 256 }}>
        LeftBar
      </div>
      <div style={{ background: "var(--bg-elevated)", borderRadius: 12, position: "fixed", top: 56 + 8 + 8, bottom: 8, left: 256 + 8 + 8, right: 8, "--story-frame-height": "calc(100dvh - 160px)", display: "flex", flexDirection: "column",  alignItems: "center", overflow: "auto" }}>
        <div style={{ background: "var(--bg)", width: 375, padding: 8, border: "1px solid var(--text-primary)", borderRadius: 8, margin: "8px" }}>
          <StoryContainer framesDict={frameDict} firstFrameId={firstFrameId} />
        </div>
        <div style={{ background: "var(--bg)", width: 375, padding: 8, border: "1px solid var(--text-primary)", borderRadius: 8 }}>
          <StoryContainer framesDict={frameDict} firstFrameId={firstFrameId} />
        </div>
      </div>
    </>
  );
}

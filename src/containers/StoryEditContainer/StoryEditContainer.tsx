"use client";

import { type FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { IStory } from "@/types";
import { EditStoryLayout } from "@/components/isomorphic";
import { TopBar } from "./TopBar";
import { Board } from "./Board";
import { LeftBar } from "./LeftBar";
import { StoryEditProvider, useStoryEdit } from "./StoryEditContext";

const StoryEditContainer: FC = () => {
  const {
    resetFrame,
  } = useStoryEdit(); // TODO: avoid requiring context for this component

  return (
    <EditStoryLayout
      top={<TopBar />}
      left={<LeftBar />}
      board={<Board />}
      boardOnClick={resetFrame}
    />
  );
};

type Props = {
  story: IStory;
};

const StoryEditContainerWrapper = ({ story }: Props) => (
  <DndProvider backend={HTML5Backend}>
    <StoryEditProvider story={story}>
      <StoryEditContainer />
    </StoryEditProvider>
  </DndProvider>
);

export { StoryEditContainerWrapper as StoryEditContainer };

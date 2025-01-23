import { type FC } from "react";
import { useStoryEdit } from "./StoryEditContext";

const temporaryStyles = {
  border: "none",
  borderRadius: 8,
  backgroundColor: "var(--green-light-01)",
  color: "var(--text-inverse)",
  padding: "8px 16px",
};

export const TopBar: FC = () => {
  const {
    editingStory: {
      data: {
        name,
        frames,
      },
    },
    editingStory,
  } = useStoryEdit();

  return (
    <>
      <h1 style={{ marginRight: "auto", fontSize: "1.5rem" }}>{name}</h1>
      <button
        type="button"
        style={{
          ...temporaryStyles,
          marginRight: 8,
          cursor: "pointer",
        }}
        onClick={() => {
          navigator.clipboard.writeText(JSON.stringify(editingStory, null, 2));
        }}
        disabled={!frames.length}
      >
        Copiar JSON
      </button>
      <button disabled style={{
        ...temporaryStyles,
        marginRight: 8,
        backgroundColor: "var(--purple-dark-03)",
        cursor: "no-drop",
      }}>
        Ver
      </button>
      <button disabled style={{
        ...temporaryStyles,
        backgroundColor: "var(--purple-dark-03)",
        cursor: "no-drop",
      }}>
        Guardar
      </button>
    </>
  );
};

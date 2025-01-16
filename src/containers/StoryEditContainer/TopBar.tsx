import { type FC } from "react";
import { useStoryEdit } from "./StoryEditContext";

const temporaryStyles = {
  border: "none",
  borderRadius: 8,
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
          backgroundColor: "var(--bg)",
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
        backgroundColor: "var(--bg)",
        marginRight: 8,
        opacity: 0.6,
      }}>
        Ver
      </button>
      <button disabled style={{
        ...temporaryStyles,
        backgroundColor: "var(--primary)",
        color: "var(--text-inverse)",
        opacity: 0.6,
      }}>
        Guardar
      </button>
    </>
  );
};

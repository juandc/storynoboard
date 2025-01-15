import { type FC } from "react";
import { useStoryEdit } from "./StoryEditContext";

export const TopBar: FC = () => {
  const {
    editingStory: {
      data: {
        name,
      },
    },
  } = useStoryEdit();

  return (
    <>
      <h1 style={{ marginRight: "auto", fontSize: "1.5rem" }}>{name}</h1>
      <button disabled style={{
        border: "none",
        borderRadius: 8,
        backgroundColor: "var(--bg)",
        padding: "8px 16px",
        marginRight: 8,
        opacity: 0.6,
      }}>
        Ver
      </button>
      <button disabled style={{
        border: "none",
        borderRadius: 8,
        backgroundColor: "var(--primary)",
        color: "var(--text-inverse)",
        padding: "8px 16px",
        opacity: 0.6,
      }}>
        Guardar
      </button>
    </>
  );
};

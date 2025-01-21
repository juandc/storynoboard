import type { FC, ReactNode } from "react";
import styles from "./Shelf.module.css";

type ShelfProps = {
  // shelf: any[][];
  columns: any[];
  columnContainer: (id: string, c: ReactNode) => ReactNode;
};

export const Shelf: FC<ShelfProps> = ({
  columns,
  columnContainer,
}) => {
  return (
    <div className={styles.shelf}>
      {/* {[].map(() => <ShelfColumn />)} */}

      <h1>ShelvesContainer</h1>
      <ul>
        {columns.map((column) => columnContainer(column.id, (
          <ul key={column.id} className={styles.column}>
            <h2>{column.name}</h2>
            {column.stories.map((story: any) => (
              <li key={story.id}>{story.title}</li>
            ))}
          </ul>
        )))}
      </ul>

      {/* <ul>
        {columnContainer((
          <ul className={styles.column}>
            <h2>Escribiendo</h2>
            <li>Story 100</li>
            <li>Story 200</li>
            <li>Story 300</li>
          </ul>
        ))}
        {columnContainer((
          <ul className={styles.column}>
            <h2>Publicados</h2>
            <li>Story 900</li>
            <li>Story 990</li>
            <li>Story 999</li>
          </ul>
        ))}
        {columnContainer((
          <ul className={styles.column}>
            <h2>Por leer</h2>
            <li>Story 1</li>
            <li>Story 2</li>
            <li>Story 3</li>
          </ul>
        ))}
        {columnContainer((
          <ul className={styles.column}>
            <h2>Leyendo</h2>
            <li>Story 5</li>
            <li>Story 6</li>
            <li>Story 7</li>
          </ul>
        ))}
        {columnContainer((
          <ul className={styles.column}>
            <h2>Leídos</h2>
            <li>Story 5</li>
            <li>Story 6</li>
            <li>Story 7</li>
          </ul>
        ))}
      </ul> */}
    </div>
  );
};

// type ShelfColumnProps = {};

// export const ShelfColumn: FC<ShelfColumnProps> = () => {
//   return (
//     <ul>
//       {[].map(() => <ShelfStory />)}
//     </ul>
//   );
// };

// type ShelfStoryProps = {};

// export const ShelfStory: FC<ShelfStoryProps> = () => {
//   return (
//     <li>Story</li>
//   );
// };

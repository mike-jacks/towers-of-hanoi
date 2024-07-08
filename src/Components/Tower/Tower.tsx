import Disk from "../Disk/Disk";
import Droppable from "../Droppable/Droppable";
import { DiskImage, plateImage } from "../images";
import styles from "./Tower.module.css";

export type TowerProps = {
  towerNumber: number;
  towers: DiskImage[][];
  collapse: boolean;
};

export default function Tower({ towerNumber, towers, collapse }: TowerProps) {
  const currentTower = towers[towerNumber - 1];

  return (
    <Droppable id={String(towerNumber)}>
      <div className={styles.burger_container}>
        <Disk
          imageSource={plateImage.source}
          imageAltName={plateImage.name}
          className={`${styles[`disk-${0}`]} ${styles.disk}`}
          isDraggable={false}
        />
        {currentTower.map((disk, index) => {
          const className = collapse ? `${styles[`disk-${index + 1}-win`]} ${styles.disk}` : `${styles[`disk-${index + 1}`]} ${styles.disk}`;
          return (
            <Disk
              key={index}
              imageSource={disk.source}
              imageAltName={disk.name}
              className={className}
              isDraggable={index === currentTower.length - 1 && disk.name !== plateImage.name} // Only the top disk is draggable
            />
          );
        })}
      </div>
    </Droppable>
  );
}

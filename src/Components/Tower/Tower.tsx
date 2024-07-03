import { useDroppable } from "@dnd-kit/core";
import { Dispatch, SetStateAction } from "react";
import Disk from "../Disk/Disk";
import { DiskImage, plateImage } from "../images";
import styles from "./Tower.module.css";

export type TowerProps = {
  towerNumber: number;
  towers: DiskImage[][];
  selectedTower: number | null;
  setSelectedTower: Dispatch<SetStateAction<number | null>>;
  setMoveToTower: Dispatch<SetStateAction<number | null>>;
};

export default function Tower({ towerNumber, towers, selectedTower, setSelectedTower, setMoveToTower }: TowerProps) {
  const { isOver, setNodeRef } = useDroppable({ id: `droppable-${towerNumber}` });

  function handleSetSelectedTower() {
    console.log("set selected tower: ", towerNumber);
    setSelectedTower(towerNumber);
  }

  function handleSetMoveToTower() {
    console.log("set move to tower: ", towerNumber);
    setMoveToTower(towerNumber);
  }

  const currentTower = towers[towerNumber - 1];
  const isSelectedTower = selectedTower == towerNumber;
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div className={styles.burger_container} onClick={selectedTower ? handleSetMoveToTower : handleSetSelectedTower} ref={setNodeRef} style={style}>
      <Disk imageSource={plateImage.source} imageAltName={plateImage.name} className={`${styles[`disk-${plateImage.value}`]} ${styles.disk}`} />
      {currentTower.map((disk, index) => {
        return (
          <Disk
            key={index}
            imageSource={disk.source}
            imageAltName={disk.name}
            className={`${styles[`disk-${disk.value}`]} ${styles.disk}`}
            selected={isSelectedTower && index === currentTower.length - 1}
            isDraggable={index === currentTower.length - 1 && disk.name !== plateImage.name} // Only the top disk is draggable
          />
        );
      })}
    </div>
  );
}

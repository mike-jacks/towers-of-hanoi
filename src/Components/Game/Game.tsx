import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import Disk from "../Disk/Disk";
import { bottomBunImage, cheeseImage, DiskImage, lettuceImage, meatImage, onionsImage, picklesImage, topBunImage } from "../images";
import Tower from "../Tower/Tower";
import styles from "./Game.module.css";

export default function Game() {
  const [towers, setTowers] = useState<DiskImage[][]>([
    [bottomBunImage, meatImage, lettuceImage, cheeseImage, onionsImage, picklesImage, topBunImage],
    [],
    [],
  ]);
  const [selectedTower, setSelectedTower] = useState<number | null>(null);
  const [moveToTower, setMoveToTower] = useState<number | null>(null);
  const [draggingDisk, setDraggingDisk] = useState<DiskImage | null>(null);

  useEffect(() => {
    if (moveToTower === null) {
      return;
    }
    setTowers((prev) => {
      const newTowers = prev.map((tower) => [...tower]);
      const selectedElement = newTowers[selectedTower! - 1].pop();
      const movedToElement = newTowers[moveToTower - 1][newTowers[moveToTower - 1].length - 1];
      setSelectedTower(null);
      setMoveToTower(null);
      if (!selectedElement) {
        return prev;
      }
      if (movedToElement === undefined || selectedElement.value < movedToElement.value) {
        newTowers[moveToTower - 1].push(selectedElement!);
        return newTowers;
      } else {
        console.log("Not a valid move.");
        return prev;
      }
    });
  }, [moveToTower, selectedTower]);

  function handleDragStart(event: any) {
    const { active } = event;
    const towerIndex = towers.findIndex((tower) => tower.some((disk) => disk.name === active.id));
    if (towerIndex !== -1) {
      const disk = towers[towerIndex].find((disk) => disk.name === active.name);
      setDraggingDisk(disk || null);
    }
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (over) {
      const fromTowerIndex = towers.findIndex((tower) => tower.some((disk) => disk.name === active.id));
      const toTowerIndex = parseInt(over.id.replace("droppable-", ""), 10) - 1;

      if (fromTowerIndex !== -1 && fromTowerIndex !== toTowerIndex) {
        setTowers((prevTowers) => {
          const newTowers = prevTowers.map((tower) => [...tower]);
          const disk = newTowers[fromTowerIndex].pop();
          if (disk) {
            const topDisk = newTowers[toTowerIndex][newTowers[toTowerIndex].length - 1];
            if (!topDisk || disk.value < topDisk.value) {
              newTowers[toTowerIndex].push(disk);
            } else {
              // Move is not valid
              newTowers[fromTowerIndex].push(disk); // revert move
              console.log("Not a valid move.");
            }
          }
          return newTowers;
        });
      }
    }
    setDraggingDisk(null);
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <p>Game</p>
      <div className={styles.container}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Tower
            key={index}
            towerNumber={index + 1}
            towers={towers}
            selectedTower={selectedTower}
            setSelectedTower={setSelectedTower}
            setMoveToTower={setMoveToTower}
          />
        ))}
      </div>
      <DragOverlay>
        {draggingDisk ? (
          <Disk
            imageSource={draggingDisk.source}
            imageAltName={draggingDisk.name}
            className={`${styles[`disk-${draggingDisk.value}`]} ${styles.disk} ${styles.selected}`}
            isDragging={true} // Pass the dragging state to the Disk component
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

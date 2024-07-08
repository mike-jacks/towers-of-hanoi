import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { bottomBunImage, cheeseImage, DiskImage, lettuceImage, meatImage, onionsImage, picklesImage, topBunImage } from "../images";
import Tower from "../Tower/Tower";
import styles from "./Game.module.css";

export default function Game() {
  const [towers, setTowers] = useState<DiskImage[][]>([
    [topBunImage],
    [],
    [bottomBunImage, meatImage, lettuceImage, cheeseImage, onionsImage, picklesImage],
  ]);
  const [gameCounter, setGameCounter] = useState<number>(0);
  const [collapse, setCollapse] = useState<boolean>(false);

  useEffect(() => {
    const checkForWinAndCollapse = async () => {
      if (towers[2].length === 7) {
        setCollapse(true);
        await new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
        alert(`Congratulations!\nYou Won completing it in ${gameCounter} moves!!!`);
      } else {
        setCollapse(false);
      }
    };
    checkForWinAndCollapse();
  }, [towers, gameCounter]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over) {
      const fromTowerIndex = towers.findIndex((tower) => tower.some((disk) => disk.name === active.id));
      const toTowerIndex = parseInt(over.id.toString().replace("droppable-", ""), 10) - 1;

      if (fromTowerIndex !== -1 && fromTowerIndex !== toTowerIndex) {
        setTowers((prevTowers) => {
          const newTowers = prevTowers.map((tower) => [...tower]);
          const disk = newTowers[fromTowerIndex].pop();
          if (disk) {
            const topDisk = newTowers[toTowerIndex][newTowers[toTowerIndex].length - 1];
            if (!topDisk || disk.value < topDisk.value) {
              newTowers[toTowerIndex].push(disk);
              setGameCounter((prev) => prev + 1);
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
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <p>Current number of moves: {gameCounter}</p>
      <div className={styles.container}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Tower key={index} towerNumber={index + 1} towers={towers} collapse={collapse} />
        ))}
      </div>
    </DndContext>
  );
}

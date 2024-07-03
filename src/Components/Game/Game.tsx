import { useEffect, useState } from "react";
import { bottomBunImage, cheeseImage, DiskImage, lettuceImage, meatImage, onionsImage, picklesImage, topBunImage } from "../images";
import styles from "./Game.module.css";

import Tower from "../Tower/Tower";
export default function Game() {
  const [towers, setTowers] = useState<DiskImage[][]>([
    [bottomBunImage, meatImage, lettuceImage, cheeseImage, onionsImage, picklesImage, topBunImage],
    [],
    [],
  ]);
  const [selectedTower, setSelectedTower] = useState<number | null>(null);
  const [moveToTower, setMoveToTower] = useState<number | null>(null);

  // useEffect(() => {
  // if (selectedTower === null) {
  //     return;
  // }
  // }, [selectedTower]);

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

  return (
    <>
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
    </>
  );
}

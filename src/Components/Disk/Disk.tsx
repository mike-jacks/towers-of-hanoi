import Draggable from "../Draggable/Draggable";
import styles from "./Disk.module.css";

type DiskProps = {
  imageSource: string;
  imageAltName: string;
  className: string;
  selected?: boolean;
  isDragging?: boolean;
  isDraggable?: boolean;
};

export default function Disk({ imageSource, imageAltName, className, selected }: DiskProps) {
  const diskClass = selected ? `${className} ${styles.selected}` : className;
  return (
    <Draggable id={imageAltName}>
      <img src={imageSource} alt={imageAltName} className={diskClass} draggable={false} />
    </Draggable>
  );
}

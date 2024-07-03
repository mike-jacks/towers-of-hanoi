import { useDraggable } from "@dnd-kit/core";
import styles from "./Disk.module.css";

type DiskProps = {
  imageSource: string;
  imageAltName: string;
  className: string;
  selected?: boolean;
  isDragging?: boolean;
  isDraggable?: boolean;
};

export default function Disk({ imageSource, imageAltName, className, selected, isDragging, isDraggable = true }: DiskProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: imageAltName,
    disabled: !isDraggable,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        filter: isDragging ? "drop-shadow(0px 0px 10px red)" : undefined,
      }
    : undefined;
  const diskClass = selected ? `${className} ${styles.selected}` : className;
  return (
    <img src={imageSource} alt={imageAltName} className={diskClass} draggable={false} ref={setNodeRef} style={style} {...listeners} {...attributes} />
  );
}

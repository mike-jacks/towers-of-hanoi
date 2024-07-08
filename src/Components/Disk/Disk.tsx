import Draggable from "../Draggable/Draggable";

type DiskProps = {
  imageSource: string;
  imageAltName: string;
  className: string;
  isDragging?: boolean;
  isDraggable: boolean;
};

export default function Disk({ imageSource, imageAltName, className, isDraggable }: DiskProps) {
  return (
    <Draggable id={imageAltName} isDraggable={isDraggable}>
      <img src={imageSource} alt={imageAltName} className={className} draggable={false} />
    </Draggable>
  );
}

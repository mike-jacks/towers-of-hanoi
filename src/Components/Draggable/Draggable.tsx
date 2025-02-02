import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type DraggableProps = {
  id: string;
  children: React.ReactNode;
  isDraggable: boolean;
};

export default function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: props.id,
    disabled: !props.isDraggable,
  });
  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    filter: isDragging ? "drop-shadow(0px 0px 10px red)" : "none",
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}

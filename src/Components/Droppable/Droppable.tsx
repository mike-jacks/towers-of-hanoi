import { useDroppable } from "@dnd-kit/core";

type DroppableProps = {
  id: string;
  children: React.ReactNode;
};

export default function Droppable(props: DroppableProps) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return <div ref={setNodeRef}>{props.children}</div>;
}

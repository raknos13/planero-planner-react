import { useState } from "react";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [items, setItems] = useState([
    { id: 0, name: "Start building Planero" },
    { id: 1, name: "Stop procrastinating" },
    { id: 2, name: "You can't learn unless you build" },
  ]);
  console.log(items);
  return (
    <ul>
      {items.map((item) => (
        <TodoItem key={item.id} name={item.name} />
      ))}
    </ul>
  );
}

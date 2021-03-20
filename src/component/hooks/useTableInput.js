import { useState } from "react";

function useTableInput() {
  const [editing, setEditing] = useState(false); // Buddy's idea bout how to make the values change on the render of the table
  const [value, setValue] = useState(0); // Buddy's idea bout how to make the values change on the render of the table

  const onClickHandler = (e) => {
    e.preventDefault();
    setEditing(!editing);
    console.log(value,e.target.name)
  };

  return [editing,value,setValue,onClickHandler]
}
export default useTableInput;

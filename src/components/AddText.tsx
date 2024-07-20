import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const AddText = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");

    const handleSave = () => {
        const storedData = localStorage.getItem("applifireData");
        const existingData = storedData ? JSON.parse(storedData) : { text: [] };

        const newTextItem = { title, value };
        existingData.text.push(newTextItem);
        localStorage.setItem("applifireData", JSON.stringify(existingData));
        setTitle("");
        setValue("");
    };

  return (
    <Popover>
            <PopoverTrigger>
              <Button variant={"outline"}>+ Text</Button>
            </PopoverTrigger>
            <PopoverContent>
              Add new text item.
              <Input
                placeholder="Title"
                className="my-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                placeholder="Value"
                className="my-2"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button
                onClick={handleSave}
              >Save</Button>
            </PopoverContent>
          </Popover>
  )
}

export default AddText
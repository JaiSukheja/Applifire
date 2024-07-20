import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";

const AddDescription = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");

    const handleSave = () => {
        const storedData = localStorage.getItem("applifireData");
        const existingData = storedData ? JSON.parse(storedData) : { description: [] };

        const newDescriptionItem = { title, value };
        existingData.description.push(newDescriptionItem);
        localStorage.setItem("applifireData", JSON.stringify(existingData));
        setTitle("");
        setValue("");
    };

    return (
        <Popover>
            <PopoverTrigger>
                <Button variant={"outline"}>+ Description</Button>
            </PopoverTrigger>
            <PopoverContent>
                Add Description
                <Input
                    placeholder="Title"
                    className="my-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                    placeholder="Value"
                    className="my-2"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button onClick={handleSave}>Save</Button>
            </PopoverContent>
        </Popover>
    )
}

export default AddDescription
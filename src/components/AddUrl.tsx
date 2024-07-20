import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const AddUrl = () => {
    const [urlTitle, setUrlTitle] = useState("");
    const [urlValue, setUrlValue] = useState("");

    const handleSave = () => {
        const storedData = localStorage.getItem("applifireData");
        const existingData = storedData ? JSON.parse(storedData) : { url: [] };

        const newUrlItem = { urlTitle, urlValue };
        existingData.url.push(newUrlItem);
        localStorage.setItem("applifireData", JSON.stringify(existingData));
        setUrlTitle("");
        setUrlValue("");
    };

    return (
        <Popover>
            <PopoverTrigger>
                <Button variant={"outline"}>+ URL</Button>
            </PopoverTrigger>
            <PopoverContent>
                Add URL
                <Input
                    placeholder="Title"
                    className="my-2"
                    value={urlTitle}
                    onChange={(e) => setUrlTitle(e.target.value)}
                />
                <Input
                    placeholder="Value"
                    className="my-2"
                    value={urlValue}
                    onChange={(e) => setUrlValue(e.target.value)}
                />
                <Button onClick={handleSave}>Save</Button>
            </PopoverContent>
        </Popover>
    )
}

export default AddUrl;

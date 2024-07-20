import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";
const AddProject = () => {
    
    const [project, setProject] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");

    const handleSave = () => {
        const storedData = localStorage.getItem("applifireData");
        const existingData = storedData ? JSON.parse(storedData) : { projects: [] };

        const newProjectItem = { project, description, url };
        existingData.projects.push(newProjectItem);
        localStorage.setItem("applifireData", JSON.stringify(existingData));
        setProject("");
        setDescription("");
        setUrl("");
    };
    
    return (
        <Popover>
            <PopoverTrigger>
                <Button variant={"outline"}>+ Project</Button>
            </PopoverTrigger>
            <PopoverContent>
                Add Project
                <Input
                    placeholder="Project Name"
                    className="my-2"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                />
                <Textarea
                    placeholder="Description"
                    className="my-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                    placeholder="URL"
                    className="my-2"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Button onClick={handleSave}>Save</Button>
            </PopoverContent>
        </Popover>
    )
}

export default AddProject
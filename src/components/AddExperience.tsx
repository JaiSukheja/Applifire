import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";

const AddExperience = () => {

    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [description, setDescription] = useState("");

    const handleSave = () => {
        const storedData = localStorage.getItem("applifireData");
        const existingData = storedData ? JSON.parse(storedData) : { experience: [] };

        const newExperienceItem = { company, role, start, end, description };
        existingData.experience.push(newExperienceItem);
        localStorage.setItem("applifireData", JSON.stringify(existingData));
        setCompany("");
        setRole("");
        setStart("");
        setEnd("");
        setDescription("");
    };


    return (
        <Popover>
            <PopoverTrigger>
                <Button variant={"outline"}>+ Experience</Button>
            </PopoverTrigger>
            <PopoverContent>
                Add Experience
                <Input
                    placeholder="Company Name"
                    className="my-2"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <Input
                    placeholder="Role"
                    className="my-2"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <div className="flex gap-2">
                    <Input
                        placeholder="Start Date"
                        className="w-1/2 my-2"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                    />
                    <Input
                        placeholder="End Date"
                        className="w-1/2 my-2"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                    />
                </div>
                <Textarea
                    placeholder="Description"
                    className="my-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={handleSave}>Save</Button>
            </PopoverContent>
        </Popover>
    )
}

export default AddExperience
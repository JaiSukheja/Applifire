import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const AddSkill = () => {

    const [skill, setSkill] = useState("");

    const handleSave = () => {
        const storedData = localStorage.getItem("applifireData");
        const existingData = storedData ? JSON.parse(storedData) : { skill: [] };

        const newSkillItem = skill;
        existingData.skills.push(newSkillItem);
        localStorage.setItem("applifireData", JSON.stringify(existingData));
        setSkill("");
    };

    return (
        <Popover>
            <PopoverTrigger>
                <Button variant={"outline"}>+ Skill</Button>
            </PopoverTrigger>
            <PopoverContent>
                Add Skill
                <Input
                    placeholder="Skill Name"
                    className="my-2"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                />
                <Button onClick={handleSave}>Save</Button>
            </PopoverContent>
        </Popover>
    )
}

export default AddSkill
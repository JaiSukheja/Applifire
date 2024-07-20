import { IoCopyOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { FaCheck, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";


  const SkillsContainer = () => {
  const [data, setData] = useState<{ skills: string[] }>({ skills: [] });
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("applifireData");
    if (data) {
      setData(JSON.parse(data));
    }
  }, []);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditValue(data.skills[index]);
  };

  const handleSaveEdit = (index: number) => {
    const newData = { ...data };
    newData.skills[index] = editValue;
    setData(newData);
    localStorage.setItem("applifireData", JSON.stringify(newData));
    setEditIndex(-1);
  };

  const handleDelete = (index: number) => {
    const newData = { ...data };
    newData.skills.splice(index, 1);
    setData(newData);
    localStorage.setItem("applifireData", JSON.stringify(newData));
  };
    

    return (
        <div className="flex gap-2 flex-col w-full">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <div className="text-2xl font-semibold text-slate-50">SKILLS</div>
        </div>
        <div className="flex gap-2 flex-wrap w-full justify-evenly">
        {data.skills.map((skill, index) => (
          <div key={index} className="flex gap-2 justify-evenly items-center border-slate-800 border px-2 py-1 rounded-lg">
            <div className="flex flex-col w-32">
              <div className="flex justify-between items-center">
                {editIndex === index ? (
                  <Input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full"
                  />
                ) : (
                  skill
                )}
              </div>
            </div>
            <div className="flex w-max gap-2">
              <Button
                variant="outline"
                className="flex items-center justify-center p-2"
                onClick={() => handleCopy(skill)}
              >
                <IoCopyOutline />
              </Button>
              {editIndex === index ? (
                <Button
                  variant="outline"
                  className="flex items-center justify-center p-2 text-green-600"
                  onClick={() => handleSaveEdit(index)}
                >
                  <FaCheck />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="flex items-center justify-center p-2 text-blue-600"
                  onClick={() => handleEdit(index)}
                >
                  <FaRegEdit />
                </Button>
              )}
              <Button
                variant="outline"
                className="flex items-center justify-center p-2 text-red-600"
                onClick={() => handleDelete(index)}
              >
                <FaTrashAlt />
              </Button>
            </div>
          </div>
        ))}
      </div>
      </div>
    )
  }
  
  export default SkillsContainer
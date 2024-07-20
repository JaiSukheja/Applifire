import { IoCopyOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { FaCheck, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";


const ExperienceContainer = () => {
  const [data, setData] = useState<{ experience: { company: string; role: string; start: string; end: string; description: string }[] }>({ experience: [] });
  const [editIndex, setEditIndex] = useState({ company: -1, role: -1, description: -1 });
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

  const handleEdit = (type: string, index: number) => {
    setEditIndex({ ...editIndex, [type]: index });
    setEditValue(type === "description" ? data.experience[index].description : (type === "company" ? data.experience[index].company : data.experience[index].role));
  };

  const handleSaveEdit = (type: string, index: number) => {
    const newData = { ...data };
    if (type === "description") {
      newData.experience[index].description = editValue;
    } else if (type === "company") {
      newData.experience[index].company = editValue;
    } else {
      newData.experience[index].role = editValue;
    }
    setData(newData);
    localStorage.setItem("applifireData", JSON.stringify(newData));
    setEditIndex({ company: -1, role: -1, description: -1 });
  };

  const handleDelete = (index: number) => {
    const newData = { ...data };
    newData.experience.splice(index, 1);
    setData(newData);
    localStorage.setItem("applifireData", JSON.stringify(newData));
  };

  return (
    <div className="flex gap-2 flex-col w-full">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
        <div className="text-2xl font-semibold text-slate-50">EXPERIENCE</div>
      </div>
      <div className="flex flex-col gap-6 w-full">
        {data.experience.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 border border-slate-800 rounded-lg p-2">
            <div className="flex justify-between items-center gap-2">
              <div className="text-2xl font-semibold border border-slate-700 px-2 py-1 rounded-lg w-full">
                {editIndex.company === index ? (
                  <Input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full"
                  />
                ) : 
                (<>
                  {item.company}
                </>)
                }
              </div>
              <div className="flex items-center w-1/5 gap-2">
                <Button
                  variant="outline"
                  className="flex items-center justify-center p-2"
                  onClick={() => handleCopy(item.company)}
                >
                  <IoCopyOutline />
                </Button>
                {editIndex.company === index ? (
                  <Button
                    variant="outline"
                    className="flex items-center justify-center p-2 text-green-600"
                    onClick={() => handleSaveEdit("company", index)}
                  >
                    <FaCheck />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="flex items-center justify-center p-2 text-blue-600"
                    onClick={() => handleEdit("company", index)}
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
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold flex justify-between items-center w-full gap-2">
                <span className="border border-slate-700 px-2 py-1 rounded-lg w-full">
                  {editIndex.role === index ? (
                    <Input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    item.role
                  )}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="flex items-center justify-center p-2"
                    onClick={() => handleCopy(item.role)}
                  >
                    <IoCopyOutline />
                  </Button>
                  {editIndex.role === index ? (
                    <Button
                      variant="outline"
                      className="flex items-center justify-center p-2 text-green-600"
                      onClick={() => handleSaveEdit("role", index)}
                    >
                      <FaCheck />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="flex items-center justify-center p-2 text-blue-600"
                      onClick={() => handleEdit("role", index)}
                    >
                      <FaRegEdit />
                    </Button>
                  )}
                  {/* <Button
                    variant="outline"
                    className="flex items-center justify-center p-2 text-red-600"
                    onClick={() => handleDelete(index)}
                  >
                    <FaTrashAlt />
                  </Button> */}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold px-2">
                {item.start} - {item.end}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="flex items-center justify-center p-2"
                  onClick={() => handleCopy(item.description)}
                >
                  <IoCopyOutline />
                </Button>
                {editIndex.description === index ? (
                  <Button
                    variant="outline"
                    className="flex items-center justify-center p-2 text-green-600"
                    onClick={() => handleSaveEdit("description", index)}
                  >
                    <FaCheck />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="flex items-center justify-center p-2 text-blue-600"
                    onClick={() => handleEdit("description", index)}
                  >
                    <FaRegEdit />
                  </Button>
                )}
                {/* <Button
                  variant="outline"
                  className="flex items-center justify-center p-2 text-red-600"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrashAlt />
                </Button> */}
              </div>
            </div>
            <div className="flex justify-between items-center w-full border border-slate-800 rounded-lg p-2">
              {editIndex.description === index ? (
                <Textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full h-20"
                />
              ) : (
                item.description
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExperienceContainer
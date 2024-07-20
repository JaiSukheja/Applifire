import { IoCopyOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { FaCheck, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";


const DescriptionContainer = () => {
  const [data, setData] = useState<{ description: { title: string; value: string }[] }>({ description: [] });
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
    setEditValue(data.description[index].value);
  };

  const handleSaveEdit = (index: number) => {
    const newData = { ...data };
    newData.description[index].value = editValue;
    setData(newData);
    localStorage.setItem("applifireData", JSON.stringify(newData));
    setEditIndex(-1);
  };

  const handleDelete = (index: number) => {
    const newData = { ...data };
    newData.description.splice(index, 1);
    setData(newData);
    localStorage.setItem("applifireData", JSON.stringify(newData));
  }



  return (

    <div className="flex gap-2 flex-col w-full">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        <div className="text-2xl font-semibold text-slate-50">DESCRIPTION</div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {data.description.map((item, index) => (
          <div key={index} className="flex justify-between gap-2 flex-col">
            <div className="flex justify-between">
              <div className="text-lg font-semibold p-2">{item.title}:</div>
              <div className="flex w-1/5 gap-2">
              <Button
                variant="outline"
                className="flex items-center justify-center p-2"
                onClick={() => handleCopy(item.value)}
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
            <div className="flex justify-between items-center border-slate-800 border p-2 rounded-lg">
              {editIndex === index ? (
                <Textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full h-20"
                />
              ) : (
                item.value
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DescriptionContainer
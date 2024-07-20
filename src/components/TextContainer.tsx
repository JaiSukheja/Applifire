/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { FaCheck, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Input } from "./ui/input";


const TextContainer = () => {
  const [data, setData] = useState<{ text: { title: string; value: string }[] }>({ text: [] });
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
    setEditValue(data.text[index].value);
  };

  const handleSaveEdit = (index: number) => {
    const newData = { ...data };
    newData.text[index].value = editValue;
    setData(newData);
    localStorage.setItem("applifireData", JSON.stringify(newData));
    setEditIndex(-1);
  };  

  const handleDelete = (index: number) => {
    const newData = { ...data };
    newData.text.splice(index, 1);
    setData(newData);
    localStorage.setItem("applifireData", JSON.stringify(newData));
  }
  

  return (
    <div className="flex gap-2 flex-col w-full">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
        <div className="text-2xl font-semibold text-slate-50">TEXT</div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {data.text.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-2">
            <div className="text-lg font-semibold w-1/3">{item.title}:</div>
            <div className="flex justify-between items-center w-1/2 border-slate-800 border p-2 rounded-lg">
              {editIndex === index ? (
                <Input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full"
                />
              ) : (
                item.value
              )}
            </div>
            <div className="flex items-center w-1/5 gap-2">
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
        ))}
      </div>
    </div>
  );
};

export default TextContainer;

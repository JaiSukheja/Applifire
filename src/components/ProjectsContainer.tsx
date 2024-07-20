import { IoCopyOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { FaCheck, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";


const ProjectsContainer = () => {
  const [data, setData] = useState<{ projects: { project: string; description: string; url: string }[] }>({ projects: [] });
  const [editIndex, setEditIndex] = useState({ project: -1, description: -1, url: -1 });
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
    setEditValue(type === "description" ? data.projects[index].description : (type === "project" ? data.projects[index].project : data.projects[index].url));
  };

  const handleSaveEdit = (type: string, index: number) => {
    const newData = { ...data };
    if (type === "description") {
      newData.projects[index].description = editValue;
    } else if (type === "project") {
      newData.projects[index].project = editValue;
    } else {
      newData.projects[index].url = editValue;
    }
    setData(newData);
    localStorage.setItem("applifireData", JSON.stringify(newData));
    setEditIndex({ project: -1, description: -1, url: -1 });
  };

  const handleDelete = (index: number) => {
    const newData = { ...data };
    newData.projects.splice(index, 1);
    setData(newData);
    localStorage.setItem("applifireData", JSON.stringify(newData));
  };

  return (
    <div className="flex gap-2 flex-col w-full">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
      <div className="text-2xl font-semibold text-slate-50">PROJECTS</div>
    </div>
    <div className="flex flex-col gap-6 w-full">
      {
        data.projects.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 border border-slate-800 rounded-lg p-2">
            <div className="text-2xl font-semibold px-2 pt-2 flex justify-between">
              <span>
                {item.project}
              </span>
              <div className="flex items-center w-1/5 gap-2">
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
                <Button
                  variant="outline"
                  className="flex items-center justify-center p-2 text-red-600"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrashAlt />
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center w-full px-4 border border-slate-800 rounded-lg p-2">
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
            <div className="flex gap-2 items-center justify-between px-2 w-full">
              <div className="flex items-center">
                <span className="text-lg font-semibold mr-2 text-slate-300">URL:</span>
                <span className="border border-slate-800 rounded-lg p-2 w-[410px] overflow-scroll">
                  {
                    editIndex.url === index ? (
                      <Input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      item.url
                    )
                  }
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex items-center justify-center p-2"
                  onClick={() => handleCopy(item.url)}
                >
                  <IoCopyOutline />
                </Button>
                {editIndex.url === index ? (
                  <Button
                    variant="outline"
                    className="flex items-center justify-center p-2 text-green-600"
                    onClick={() => handleSaveEdit("url", index)}
                  >
                    <FaCheck />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="flex items-center justify-center p-2 text-blue-600"
                    onClick={() => handleEdit("url", index)}
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
        ))
      }
      
    </div>
  </div>
  )
}

export default ProjectsContainer
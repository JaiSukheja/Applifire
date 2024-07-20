import { useEffect } from "react";
import "./App.css";
import Addbtn from "./components/Addbtn";
import DescriptionContainer from "./components/DescriptionContainer";
import ExperienceContainer from "./components/ExperienceContainer";
import ProjectsContainer from "./components/ProjectsContainer";
import SkillsContainer from "./components/SkillsContainer";
import TextContainer from "./components/TextContainer";
import UrlContainer from "./components/UrlContainer";
import { SiMediafire } from "react-icons/si";

const defaultData = {
  text: [],
  description: [],
  skills: [],
  projects: [],
  url: [],
  experience: []
};

export default function App() {
  useEffect(() => {
    const data = localStorage.getItem("applifireData");
    if (!data) {
      localStorage.setItem("applifireData", JSON.stringify(defaultData));
    }
  }, []);

  return (
    <div className="app bg-slate-950 w-[500px] h-[500px] text-white overflow-scroll">
      <div className="border-b border-gray-600 flex justify-between sticky top-0 bg-slate-950">
        <h1 className="text-white text-4xl text-center font-medium p-2 flex items-center gap-2">
        <SiMediafire className="text-6xl"/>
          APPLIFIRE
        </h1>
        <Addbtn />
      </div>
      <div className="flex justify-between p-4 flex-col gap-10">
        <TextContainer />
        <UrlContainer />
        <DescriptionContainer />
        <ExperienceContainer />
        <ProjectsContainer />
        <SkillsContainer />
      </div>
    </div>
  );
}

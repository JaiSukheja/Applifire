import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import AddText from "./AddText";
import AddDescription from "./AddDescription";
import AddExperience from "./AddExperience";
import AddProject from "./AddProject";
import AddSkill from "./AddSkill";
import AddUrl from "./AddUrl";



const Addbtn = () => {

  return (
    <div className="flex items-center justify-end p-4">
      <Popover>
        <PopoverTrigger>
          <Button>+ Add Item</Button>
        </PopoverTrigger>
        <PopoverContent className="flex gap-2 flex-wrap w-64">      
          <AddText />
          <AddDescription />
          <AddExperience />
          <AddProject />
          <AddSkill />
          <AddUrl />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Addbtn;

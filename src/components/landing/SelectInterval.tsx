import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { intervalAtom } from "@/store";
import { useAtom } from "jotai";

export const SelectInterval = () => {
  // defining all required hooks here
  const [interval, setInterval] = useAtom(intervalAtom);
  function handleChange(val: string) {
    setInterval(val);
  }
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-foreground text-sm ">Select interval</h1>
      <Select onValueChange={handleChange} defaultValue={interval}>
        <SelectTrigger className="w-[180px] text-foreground bg-background">
          <SelectValue
            className="text-opacity-50"
            placeholder={`${interval}`}
          />
        </SelectTrigger>
        <SelectContent className="dark">
          <SelectItem value="1s">1 second</SelectItem>
          <SelectItem value="1m">1 minute</SelectItem>
          <SelectItem value="5m">5 minutes</SelectItem>
          <SelectItem value="15m">15 minutes</SelectItem>
          <SelectItem value="30m">30 minutes</SelectItem>
          <SelectItem value="1h">1 hour</SelectItem>
          <SelectItem value="1d">1 day</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

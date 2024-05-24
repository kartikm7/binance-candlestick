import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { darkModeAtom } from "@/store";
import { useAtom } from "jotai";
import { LuMoon, LuSun } from "react-icons/lu";

export const Navbar = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom)
  return (
    <div className="absolute z-10 flex w-[98%] top-2 h-10 justify-between items-center">
      <h1>Binance Candlestick</h1>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-xl bg-background text-foreground p-2 rounded-sm hover:bg-stone-400 hover:bg-opacity-50 transition-all">{darkMode ? <LuMoon /> : <LuSun />}</DropdownMenuTrigger>
        <DropdownMenuContent className="bg-background text-foreground">
          <DropdownMenuItem onClick={()=>setDarkMode(false)}>Light</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>setDarkMode(true)}>Dark</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

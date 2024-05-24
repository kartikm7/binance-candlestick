import { useAtomValue } from "jotai";
import { RootLayout } from "./components/AppLayout";
import { CandleStick } from "./components/landing/CandleStick";
import { Toaster } from "./components/ui/sonner";
import { darkModeAtom } from "./store";
import { Navbar } from "./components/landing/Navbar";

function App() {
  const darkMode = useAtomValue(darkModeAtom);
  return (
    <div className={`${darkMode && "dark"}`}>
      <Toaster /> {/* weird behavior without it being at the top of the html chain */}
      <RootLayout
        className={`h-screen p-5 gap-10 overflow-hidden`}
      >
        <Navbar />
        <CandleStick />
      </RootLayout>
    </div>
  );
}

export default App;

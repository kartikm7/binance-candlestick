import { RootLayout } from "./components/AppLayout";
import { CandleStick } from "./components/landing/CandleStick";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <RootLayout className="dark h-screen p-5 gap-10">
      <Toaster />
      <h1 className="text-3xl">
        Binance <span className="font-medium">Candlestick</span>
      </h1>
      <div>
        <CandleStick />
      </div>
      <div></div>
    </RootLayout>
  );
}

export default App;

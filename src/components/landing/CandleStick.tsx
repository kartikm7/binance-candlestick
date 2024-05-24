import { options } from "@/store/mocks/mocks";
import Chart from "react-apexcharts";
import { useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { intervalAtom, seriesAtom, symbolAtom } from "@/store";
import { SelectInterval } from "./SelectInterval";
import { CryptoForm } from "./CryptoForm";
import { toast } from "sonner";

export const CandleStick = () => {
  const series = useAtomValue(seriesAtom);
  const interval = useAtomValue(intervalAtom);
  const [symbol, setSymbol] = useAtom(symbolAtom);
  const { parseInterval, fetchCrypto } = useFetch();
  const topSymbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "ADAUSDT", "XRPUSDT"];

  function handleClick(val:string){
    setSymbol(val)
    toast.info(`${val} was set!`)
  }

  useEffect(() => {
    async function api() {
      await fetchCrypto(symbol, interval);
    }
    api();
    const ms = parseInterval(interval);
    const id = setInterval(api, ms);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval, symbol]); // must since, parseInterval and the fetchCrypto affects the state updation

  return (
    <div className="min-h-[500px] w-full flex flex-col gap-2 justify-center items-center text-black">
      <div className=" text-xs md:text-base md:w-3/5 flex gap-5">
        <div className="flex flex-col gap-2 text-foreground">
          <h1 className="text-sm">Select Asset:</h1>
          <CryptoForm />
        </div>
        <SelectInterval />
      </div>
      <div className="h-5/6 w-full md:w-3/5">

      <Chart
        options={{
          title: {
            text: symbol,
            align: "left",
          },
          ...options,
        }}
        series={[{ data: series }]}
        type="candlestick"
        width='100%'
        height='100%'
      />
      </div>
      <div className=" md:w-3/5 flex gap-2">
        {topSymbols.map((val, index) => {
          return (
            <div
              key={index}
              onClick={()=>handleClick(val)}
              className="p-1 cursor-pointer text-xs md:text-sm rounded-xl bg-foreground text-background opacity-50 hover:opacity-100 transition-all"
            >
              <p>{val}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

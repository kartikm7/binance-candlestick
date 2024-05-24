import { options } from "@/store/mocks/mocks";
import Chart from "react-apexcharts";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { intervalAtom, seriesAtom, symbolAtom } from "@/store";
import { SelectInterval } from "./SelectInterval";
import { CryptoForm } from "./CryptoForm";

export const CandleStick = () => {
  const series = useAtomValue(seriesAtom);
  const interval = useAtomValue(intervalAtom);
  const symbol = useAtomValue(symbolAtom);
  const { parseInterval, fetchCrypto } = useFetch();

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
    <div className="min-h-[500px] text-black">
      <div className="flex gap-5">
        <div className="flex flex-col gap-2 text-foreground">
        <h1 className="text-sm">Select Asset:</h1>
        <CryptoForm />
        </div>
        <SelectInterval />
      </div>
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
        width={800}
        height={600}
      />
    </div>
  );
};

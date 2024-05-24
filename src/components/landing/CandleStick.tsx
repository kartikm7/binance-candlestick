import { options } from "@/store/mocks/mocks";
import Chart from "react-apexcharts";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { intervalAtom, seriesAtom } from "@/store";


export const CandleStick = () => {
  const series = useAtomValue(seriesAtom)
  const interval = useAtomValue(intervalAtom)
  const { fetchCrypto } = useFetch();

  useEffect(() => {
    async function api() {
      await fetchCrypto("BTCUSDT", "1h")
    }
    setTimeout()
    api();
  }, [interval]);

  return (
    <div className="min-h-[500px] text-black">
      <Chart
        options={options}
        series={[{data: series}]}
        type="candlestick"
        width={800}
        height={600}
      />
    </div>
  );  
};

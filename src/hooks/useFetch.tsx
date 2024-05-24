import { candleStickAPI } from "@/constants/api";
import { intervalAtom, seriesAtom, seriesInterface, symbolAtom } from "@/store";
import axios from "axios";
import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";
import { toast } from "sonner";

export type candleStickAPIType = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string
][];

export const useFetch = () => {
  // Getting the values and set functions for states
  const [isLoading, setLoading] = useState<boolean>(false);
  const setSeries = useSetAtom(seriesAtom);
  const [symbol, setSymbol] = useAtom(symbolAtom);
  const [interval, setInterval] = useAtom(intervalAtom);


  // setting the default values for the api call
  const fetchCrypto = async (
    apiSymbol: string = symbol,
    apiInterval: string = interval
  ) => {
    // checking apisymbol and apiinterval are provided if yes then updating
    if (apiSymbol && apiSymbol != symbol) setSymbol(apiSymbol);
    if (apiInterval && apiInterval != interval) setInterval(apiInterval);

    try {
      setLoading(true);
      const api = await axios.get(
        `${candleStickAPI}?symbol=${symbol}&interval=${interval}&limit=50`
      );
      const data: candleStickAPIType = api.data;
      const response: seriesInterface[] = data.map((val) => {
        return { x: new Date(val[0]), y: [val[1], val[2], val[3], val[4]] };
      });
      setLoading(false);
      setSeries(response);
    } catch (error) {
      setLoading(false);
      toast.error(`Incorrect Input! \n Please check binance.com for better understanding`);
    }
  };


  // using this for parsing the interval from string to milliseconds
  const parseInterval = (val:string) => {
    const value = parseInt(val.slice(0,-1))
    const unit = val.slice(-1);
    let milliseconds;
    switch (unit) {
      case 's':
        milliseconds = value * 1000;
        break;
      case 'm':
        milliseconds = value * 60 * 1000;
        break;
      case 'h':
        milliseconds = value * 60 * 60 * 1000;
        break;
      case 'd':
        milliseconds = value * 24 * 60 * 60 * 1000;
        break;
      default:
        throw new Error('Invalid interval unit');
  }
  
  return milliseconds
}

  return { isLoading, fetchCrypto, parseInterval };
}

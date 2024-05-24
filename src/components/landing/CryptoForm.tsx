import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LuSendHorizonal } from "react-icons/lu";
import { useAtom } from "jotai";
import { symbolAtom } from "@/store";

type FormFields = {
  crypto?: string;
};

export const CryptoForm = () => {
  const [symbol, setSymbol] = useAtom(symbolAtom)
  const { register, handleSubmit, reset } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data.crypto);
    setSymbol((preValue)=> data.crypto ?? preValue)
    reset();
  };
  return (
      <form className="relative w-[180px]" onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("crypto")} className="text-foreground bg-background" placeholder={symbol} />
        <Button
          variant={"secondary"}
          className="absolute bg-transparent text-foreground top-0 right-0"
        >
          <LuSendHorizonal className="text-base" />
        </Button>
      </form>
  );
};

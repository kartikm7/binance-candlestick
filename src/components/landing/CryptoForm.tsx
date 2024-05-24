import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LuSendHorizonal } from "react-icons/lu";
import { useAtom } from "jotai";
import { symbolAtom } from "@/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
type FormFields = {
  crypto?: string;
};

const validate: ZodSchema<FormFields> = z.object({
  crypto: z
    .string()
    .min(1, "An asset is required")
    .transform((val) => val.toUpperCase()),
});

export const CryptoForm = () => {
  const [symbol, setSymbol] = useAtom(symbolAtom);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(validate) });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data.crypto);
    setSymbol((preValue) => data.crypto ?? preValue);
    reset();
  };
  return (
    <form className="relative w-[180px]" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("crypto")}
        className="text-foreground bg-background"
        placeholder={symbol}
      />
      {errors.crypto && (
        <p className="text-xs text-red-600 mt-2 ">{`${errors.crypto.message}`}</p>
      )}
      <Button
        variant={"secondary"}
        className="absolute bg-transparent text-foreground top-0 right-0"
      >
        <LuSendHorizonal className="text-base" />
      </Button>
    </form>
  );
};

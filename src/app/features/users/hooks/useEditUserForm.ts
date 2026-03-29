import { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "../types/user.types";

const CITY_REGEX = /^[A-Za-zА-Яа-яЁё\s-]+$/;

export type FormValues = {
  name: string;
  username: string;
  email: string;
  city: string;
  phone: string;
  companyName: string;
  avatar: string;
};

export function useEditUserForm(user: User | null) {
  const schema = useMemo(() => {
    const initialPhone = user?.phone ?? "";

    return z.object({
      name: z
        .string()
        .trim()
        .min(2, "От 2 до 64 символов")
        .max(64, "От 2 до 64 символов"),
      username: z
        .string()
        .trim()
        .min(2, "От 2 до 64 символов")
        .max(64, "От 2 до 64 символов"),
      email: z.string().email("Некорректный email"),
      city: z
        .string()
        .trim()
        .min(2, "От 2 до 64 символов")
        .max(64, "От 2 до 64 символов")
        .regex(CITY_REGEX, "Допустимы только буквы, пробел и дефис"),
      phone: z.string().refine(
        (value) => value === initialPhone || /^\d+$/.test(value),
        {
          message: "Телефон должен содержать только цифры",
        }
      ),
      companyName: z
        .string()
        .trim()
        .min(2, "От 2 до 64 символов")
        .max(64, "От 2 до 64 символов"),
      avatar: z.string(),
    });
  }, [user?.phone]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      city: "",
      phone: "",
      companyName: "",
      avatar: "",
    },
  });

  const { reset, setValue } = form;
  const lastResetUserIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!user) return;
    if (lastResetUserIdRef.current === user.id) return;

    reset({
      name: user.name,
      username: user.username,
      email: user.email,
      city: user.city,
      phone: user.phone,
      companyName: user.companyName,
      avatar: user.avatar,
    });

    lastResetUserIdRef.current = user.id;
  }, [user, reset]);

  const handlePhoneChange = (value: string, originalPhone: string) => {
    if (value === originalPhone) {
      setValue("phone", value, {
        shouldValidate: true,
        shouldDirty: true,
      });
      return;
    }

    const digitsOnly = value.replace(/\D/g, "");

    setValue("phone", digitsOnly, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return {
    ...form,
    handlePhoneChange,
  };
}
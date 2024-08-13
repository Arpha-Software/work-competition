'use client';

import { Button } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { EProvider } from "@/utils/enums";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, []);

  return (
    <div className="mb-full">
      <h1 className="text-4xl text-center mt-8">Увійти</h1>
      <h1 className="text-center mt-4 mb-12">Щоб отримати доступ до голосування, вам необхідно увійти</h1>

      <div className="flex flex-col items-center justify-center w-full gap-4">
        <Button onClick={() => login(EProvider.Google)}>Увійти за допомогою Google</Button>
        <Button onClick={() => login(EProvider.Facebook)}>Увійти за допомогою Facebook</Button>
      </div>
    </div>
  );
}

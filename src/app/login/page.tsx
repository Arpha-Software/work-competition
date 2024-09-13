'use client';

import { Button } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { Categories } from "@/sections/Home/Categories";
import { Vote } from "@/sections/Vote";
import { EProvider } from "@/utils/enums";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginModal() {
  const { login, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/login') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const closeModal = () => {
    router.back();
  };

  if (!isOpen) return null;

  return (
    <>
      <div>
        <Vote category="Інноваційні та цифрові рішення для забезпечення безпеки на роботі" subcategory="" />
      </div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-xl">
        <div className="bg-white p-8 rounded-md shadow-lg max-w-md w-full">
          <h1 className="text-4xl text-center mt-4">Увійти</h1>
          <h1 className="text-center mt-4 mb-8">Щоб отримати доступ до голосування, вам необхідно увійти</h1>

          <div className="flex flex-col items-center justify-center w-full gap-4">
            <Button onClick={() => login(EProvider.Google)}>Увійти за допомогою Google</Button>
          </div>

          <div className="flex justify-center mt-6">
            <Button onClick={closeModal} variant="secondary">Закрити</Button>
          </div>
        </div>
      </div>
    </>
  );
}

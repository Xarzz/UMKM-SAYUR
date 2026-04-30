"use client";

import { CheckCircle2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Toast() {
  const { toastOpen, toastMsg, setToastOpen } = useCart();

  if (!toastOpen) return null;

  return (
    <div
      className="fixed bottom-24 right-6 max-w-sm w-full bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-900/50 rounded-2xl pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden z-[110] border border-emerald-100 dark:border-emerald-900/50 animate-in slide-in-from-bottom-5 fade-in duration-300"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {toastMsg}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => setToastOpen(false)}
              className="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

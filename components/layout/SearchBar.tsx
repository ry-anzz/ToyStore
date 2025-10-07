// src/components/layout/SearchBar.tsx
"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export function SearchBar() {
  const router = useRouter();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const search = formData.get('search') as string;
    if (search) {
      router.push(`/?q=${search}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex-grow max-w-xl relative">
      <input
        name="search"
        type="text"
        placeholder="O que você está procurando?"
        className="w-full h-10 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-blue-600">
        <Search size={20} />
      </button>
    </form>
  );
}
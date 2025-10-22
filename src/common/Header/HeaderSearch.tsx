import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { cn } from "@/utils/helper";

interface HeaderSearchProps {
  isNotFoundPage: boolean;
  showBg: boolean;
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({ isNotFoundPage, showBg }) => {
  const [search, setSearch] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    
    // Navigate to movie search by default
    navigate(`/movie?search=${encodeURIComponent(search)}`);
    setSearch("");
    setIsFocused(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative hidden md:flex items-center ml-6"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search movies..."
        className={cn(
          "py-[6px] pl-[12px] pr-[32px] rounded-full outline-none transition-all duration-300 text-[13.5px] font-medium",
          "w-[180px] md:w-[220px]",
          isFocused ? "shadow-sm" : "shadow-md",
          isNotFoundPage || showBg
            ? "bg-[#fdfdfd] dark:bg-[#302d3a] text-[#666] dark:text-primary focus:bg-[#ffffff] dark:focus:bg-[#474550]"
            : "bg-[#fdfdfd]/90 dark:bg-[#302d3a]/90 text-[#666] dark:text-primary focus:bg-[#ffffff] dark:focus:bg-[#474550]"
        )}
      />
      <button
        type="submit"
        className={cn(
          "absolute right-[10px] text-[16px] transition-all duration-200 hover:scale-110",
          isNotFoundPage || showBg
            ? "text-[#ff0000]"
            : "text-[#ff0000]"
        )}
      >
        <GoSearch />
      </button>
    </form>
  );
};

export default HeaderSearch;

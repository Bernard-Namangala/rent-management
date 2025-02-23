"use client";

import { useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Search() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative flex-1 md:max-w-sm">
      <div
        className={cn(
          "absolute inset-0 -m-1 rounded-xl transition-all duration-200",
          "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent",
          isFocused ? "opacity-100" : "opacity-0"
        )}
      />
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search anything..."
          className="pl-9 pr-9 bg-transparent border-primary/10 rounded-lg transition-all duration-200 hover:border-primary/20 focus:border-primary/30"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 hover:bg-transparent"
            onClick={() => setQuery("")}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </div>
    </div>
  );
}

import { Search } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { useState } from 'react';

interface SearchbarProps {
  completedcount?: number;
  ongoingcount: number;
  setOnSearch: (value: string) => void;
}

export default function Searchbar({ completedcount = 0, ongoingcount, setOnSearch }: SearchbarProps) {
  // const [searchTerm, setSearchTerm] = useState<string>('');
  const [value] = useDebounce(setOnSearch, 2000);
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-5">
      <div className="flex w-full items-center gap-2 bg-fade-bg border-2 border-[#f4f4f4] rounded-2xl p-2">
        <Search className="text-inActive-green ml-3" />
        <input
          type="text"
          // value={value}
          placeholder="Enter a session title"
          className="focus:outline-none font-inter-400 p-2 placeholder:text-inActive-green w-full"
          onChange={e => setOnSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <button className="border-2 border-medium-green font-inter-600 text-medium-green rounded-2xl p-2">
          completed({completedcount})
        </button>
        <button className="border-2 border-[#f4f4f4] bg-fade-bg font-inter-600 text-inActive-green rounded-2xl p-2">
          Ongoing({ongoingcount})
        </button>
      </div>
    </div>
  );
}
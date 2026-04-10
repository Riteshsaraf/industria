import { useState, useMemo, useEffect } from "react";


type Item = {
    label: string;
    value: string;
};

type Props = {
    options: Item[];
    value: string[];
    onChange: (arr : string[]) => void;
    placeholder: string;
    height?: string;
};

export default function CheckboxGroup({
    options = [],
    value = [],
    onChange = () => { },
    placeholder = "Search...",
    height = "max-h-64",
}: Props) {
    const [search, setSearch] = useState("");
    const [selectAll, setSelectAll] = useState<boolean>(false);

    const handleAllSelection = (sAll: boolean) => {
        if (sAll) {
            const allValues = options.map((f: any) => f.value);

            console.log({ allValues });
            onChange(allValues);

        }
        else {
            onChange([]);
        }

        setSelectAll(sAll);
    }

    const filteredOptions = useMemo(() => {
        return options.filter(opt =>
            opt.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, options]);

    const toggle = (val:string) => {
        let updated;
        if (value.includes(val)) {
            updated = value.filter(v => v !== val);
        } else {
            updated = [...value, val];
        }
        onChange(updated);

        const allValues = options.map((f: any) => f.value);

        if (updated.length === allValues.length) {
            setSelectAll(true);
        }
        else {
            setSelectAll(false);
        }
    };



    return (
        <div className="border rounded-lg border-gray-300 p-3 w-full">
            {/* Search */}
            <input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />

            <div className="mb-4 text-center border-gray-300">
                <label
                    key={"select-all-checkbox"}
                    className="flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-gray-100"
                >
                    <input
                        key={"select-all"}
                        type="checkbox"
                        checked={selectAll}
                        onChange={() => handleAllSelection(!selectAll)}
                        className="accent-blue-600"
                    />
                    <span className="text-sm text-semibold">Select All</span>
                </label>
            </div>

            {/* Checkbox list */}
            <div className={`${height} overflow-y-auto space-y-2 pr-1`}>
                {filteredOptions.length === 0 && (
                    <p className="text-sm text-gray-500">No results found</p>
                )}

                {filteredOptions.map((opt) => (
                    <label
                        key={opt.value}
                        className="flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-gray-100"
                    >
                        <input
                            key={opt.value}
                            type="checkbox"
                            checked={value.includes(opt.value)}
                            onChange={() => toggle(opt.value)}
                            className="accent-blue-600"
                        />
                        <span className="text-sm">{opt.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

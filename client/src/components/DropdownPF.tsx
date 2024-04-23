import { LocationOption } from "@/modules/dropdownprofile";
import React, { useState } from "react";

const locationOptions: LocationOption[] = [
  { id: 1, label: "ตัวเลือกแรก" },
  { id: 2, label: "ตัวเลือกสุดท้ายสำหรับเธอ" },
  { id: 3, label: "Other" },
];

const DropdownPF: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<LocationOption | null>(
    null
  );
  const [other, setOther] = useState<string>("");

  const handleOptionChange = (option: LocationOption | null) => {
    setSelectedOption(option);
    if (option?.label !== "Other") {
      setOther("");
    }
  };

  const handleOtherAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOther(e.target.value);
  };

  return (
    <div className="relative">
      <select
        value={selectedOption ? selectedOption.id.toString() : ""}
        onChange={(e) =>
          handleOptionChange(
            locationOptions.find(
              (option) => option.id === Number(e.target.value)
            ) || null
          )
        }
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">โปรดระบุ</option>
        {locationOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>

      {selectedOption && selectedOption.label === "Other" && (
        <div className="mt-2">
          <label
            htmlFor="other"
            className="block text-sm font-medium text-gray-700"
          >
            โปรดกรอก
          </label>
          <input
            type="text"
            id="other"
            value={other}
            onChange={handleOtherAddressChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default DropdownPF;

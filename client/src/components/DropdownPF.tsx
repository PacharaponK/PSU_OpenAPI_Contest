import { LocationOption } from "@/modules/dropdownprofile";
import React, { useState } from "react";

interface DropdownPFProps {
  type: string;
}

const locationOptions: LocationOption[] = [
  { id: 1, label: "ตัวเลือกแรก" },
  { id: 2, label: "ตัวเลือกสุดท้ายสำหรับเธอ" },
  { id: 3, label: "Other" },
];

const handleSubmit = (e: any) => {
  console.log(e);
}

const DropdownPF: React.FC<DropdownPFProps> = ({ type }) => {

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

  const handleOtherAddressChange = (e: any) => {
    setOther(e);
  };

  if (type == 'ที่อยู่ปัจจุบัน') {
    return (
      <div className="flex flex-col w-full space-y-2">
        <h1>ที่อยู่ปัจจุบัน :</h1>
        <textarea
          onChange={(event) => handleOtherAddressChange(event.target.value)}
          className="w-full h-[30vh] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => handleSubmit(other)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ยืนยัน
        </button>
      </div>
    )
  }

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
      <button
        onClick={() => handleSubmit(selectedOption)}
        disabled={!selectedOption || (selectedOption.label === "Other" && !other)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        ยืนยัน
      </button>
    </div>
  );
};

export default DropdownPF;

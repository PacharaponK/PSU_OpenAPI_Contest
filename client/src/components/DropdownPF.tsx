import conf from "@/conf/main";
import { LocationOption } from "@/modules/dropdownprofile";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface DropdownPFProps {
  type: string;
  studentId: string;
}

const locationOptions: LocationOption[] = [
  { id: 1, label: "หอพักนักศึกษาอาคาร 1" },
  { id: 2, label: "หอพักนักศึกษาอาคาร 2" },
  { id: 4, label: "หอพักนักศึกษาอาคาร 4" },
  { id: 5, label: "หอพักนักศึกษาอาคาร 5" },
  { id: 6, label: "หอพักนักศึกษาอาคาร 6" },
  { id: 7, label: "หอพักนักศึกษาอาคาร 7" },
  { id: 8, label: "หอพักนักศึกษาอาคาร 8" },
  { id: 9, label: "หอพักนักศึกษาอาคาร 9" },
  { id: 10, label: "หอพักนักศึกษาในกำกับอาคาร 10" },
  { id: 11, label: "หอพักนักศึกษาในกำกับอาคาร 11" },
  { id: 12, label: "หอพักนักศึกษาอาคาร 12" },
  { id: 13, label: "หอพักนักศึกษาอาคาร 13" },
  { id: 14, label: "หอพักนักศึกษาอาคาร 14" },
  { id: 15, label: "หอพักนักศึกษาอาคาร 15" },
  { id: 16, label: "ไม่ระบุ" },
];

const scholarOptions: LocationOption[] = [
  { id: 1, label: "กยศ." },
  { id: 2, label: "อื่นๆ" },
];


const DropdownPF: React.FC<DropdownPFProps> = ({ type, studentId } ) => {
  const app = useRouter();

  const updateProfile = async (data:any, type:string) => {
    try {
      const response = await axios.put(`${conf.urlPrefix}/users/${studentId}`, {
          [type]: data
      })
      console.log(response);
      
      app.reload();
    } catch (error) {
      console.error(error);
    }
  }
  
  const [selectedOption, setSelectedOption] = useState<LocationOption | null>(
    null
  );
  const [scholarSelectOption, setScholarSelectOption] = useState<LocationOption | null>(
    null
  );
  const [other, setOther] = useState<string>("");

  const handleSubmit = (e: any, type:string, other?:string) => {
    if (type == "scholar") {
      if (other == '') {
        updateProfile(e.label, "scholarship");
      }
      else {
        updateProfile(other, "scholarship");
      }
    }

    if (type == "dorm" && selectedOption?.label != "ไม่ระบุ" ) {
      updateProfile(e.label, "dorm");
    }

    if (type == "address") {
      updateProfile(e, "address");
    }
  }
  
  const handleOptionChange = (option: LocationOption | null, e: string) => {
    if (e == "scholar") {
      setScholarSelectOption(option);
    }
    
    if (e == "dorm") {
      setSelectedOption(option)
    }
    
    if (option?.label !== "อื่นๆ") {
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
          onClick={() => handleSubmit(other, "address")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ยืนยัน
        </button>
      </div>
    )
  }

  if (type == 'ประเภททุนการศึกษา') {
    return (
      <div className="flex flex-col w-full space-y-2">
        <h1>ประเภททุนการศึกษา :</h1>
        <select
          value={scholarSelectOption ? scholarSelectOption.id.toString() : ""}
          onChange={(e) =>
            handleOptionChange(
              scholarOptions.find(
                (option) => option.id === Number(e.target.value)
              ) || null, "scholar"
            )
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option disabled value="">โปรดระบุ</option>
          {scholarOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        {scholarSelectOption && scholarSelectOption.label === "อื่นๆ" && (
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
              onChange={(e) => handleOtherAddressChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        <button
          onClick={() => handleSubmit(scholarSelectOption, "scholar", other)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ยืนยัน
        </button>
      </div>

    )
  }

  return (
    <div className="flex flex-col w-full space-y-2 h-full">
      <h1>หอพักนักศึกษา :</h1>
      <select
        value={selectedOption ? selectedOption.id.toString() : ""}
        onChange={(e) =>
          handleOptionChange(
            locationOptions.find(
              (option) => option.id === Number(e.target.value)
            ) || null , "dorm"
          )
        }
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option disabled value="">โปรดระบุ</option>
        {locationOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        onClick={() => handleSubmit(selectedOption, "dorm")}
        disabled={!selectedOption || (selectedOption.label === "Other" && !other)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        ยืนยัน
      </button>
    </div>
  );
};

export default DropdownPF;

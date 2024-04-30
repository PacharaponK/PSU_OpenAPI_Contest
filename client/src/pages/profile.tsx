import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import Image from "next/image";
import DropdownPF from "@/components/DropdownPF";
import { useStudentContext } from "../contexts/StudentContext";
import Footer from "@/components/Footer";
import ModalPF from "@/components/ModalPF";

function Profile() {
  const { studentDetail, studentImage, fetchStudentDetail } =
    useStudentContext();
  const auth = useAuth();
  const app = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [option, setOption] = useState<string>();
  console.log("token:", auth.user?.access_token);

  
  const [showDetails, setShowDetails] = useState<boolean>(false);
  
  console.log(studentDetail);
  console.log(studentImage);
  
  const setModalOption = (option:string) => {
    setOption(option);
    setOpenModal(true);
  } 

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  if (!auth.isAuthenticated) {
    return <div>Please Login First</div>;
  }
  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen background-image">
        <Navbar />
        <div className="my-32 flex flex-col justify-center items-center w-7/12 bg-white border-[#ceddf0] border-4 p-10 rounded-3xl shadow-2xl shadow-[#6ca4ee]">
          <h1 className="text-3xl font-bold mb-6">ข้อมูลส่วนตัว</h1>
          <div className="flex flex-row">
            <div className="mr-14">
              {studentImage && studentImage.pictureBase64 && (
                <Image
                  src={`data:image/png;base64,${studentImage.pictureBase64}`}
                  alt={`StudentImage${studentImage.studentId}`}
                  width={200}
                  height={200}
                  className="rounded-md"
                />
              )}
            </div>

            <div>
              {studentDetail ? (
                <div>
                  <div className="text-md font-medium">
                    <h1>
                      ชื่อ-สกุล : {studentDetail.titleNameThai}
                      {studentDetail.studNameThai} {studentDetail.studSnameThai}
                    </h1>
                    <h1>รหัสนักศึกษา : {studentDetail.studentId}</h1>
                    <h1>คณะ : {studentDetail.facNameThai}</h1>
                    <h1>สาขาวิชา : {studentDetail.majorNameThai}</h1>
                    <h1>ชั้นปีการศึกษา : {studentDetail.yearStatus}</h1>
                    <h1>เบอร์โทรศัพท์: {studentDetail.phone}</h1>
                    <h1>อีเมล : {studentDetail.email}</h1>
                    <h1 className="flex">หอพัก : {studentDetail.dorm ? studentDetail.dorm : "ไม่ระบุ"}
                      <svg onClick={() => setModalOption("หอพัก")} className="hover:cursor-pointer w-6 h-6 ml-3 text-blue-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd" />
                        <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd" />
                      </svg>
                    </h1>
                    <h1 onClick={() => setModalOption("ประเภททุนการศึกษา")} className="flex">ประเภททุนการศึกษา : {studentDetail.scholarship ? studentDetail.scholarship : "ไม่ระบุ"}
                      <svg className="hover:cursor-pointer w-6 h-6 ml-3 text-blue-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd" />
                        <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd" />
                      </svg></h1>
                    <h1 onClick={() => setModalOption("ที่อยู่ปัจจุบัน")} className="flex">ที่อยู่ปัจจุปัน : {studentDetail.address ? studentDetail.address : "ไม่ระบุ"}
                      <svg className="hover:cursor-pointer w-6 h-6 ml-3 text-blue-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd" />
                        <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd" />
                      </svg></h1>
                  </div>
                  {showDetails &&
                    Object.entries(studentDetail).map(([key, value]) => (
                      <div key={key} className="font-medium">
                        <h1>
                          {key}: {String(value)}
                        </h1>
                      </div>
                    ))}
                  <button
                    onClick={handleShowDetails}
                    className="my-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    {showDetails ? "ซ่อนข้อมูล" : "ดูข้อมูลเพิ่มเติม"}
                  </button>
                  <ModalPF openModal={openModal} setOpenModal={setOpenModal} option={option}/>
                  {/* <h1>
                    ประเภททุนการศึกษา : <DropdownPF />
                  </h1>
                  <h1 className="py-2">
                    ที่อยู่ปัจจุปัน : <DropdownPF />
                  </h1> */}
                </div>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;

"use client";

import axios from "axios";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import Image from "next/image";
import DropdownPF from "@/components/DropdownPF";
import conf from "@/conf/main";

function Profile() {
  const auth = useAuth();
  const app = useRouter();
  console.log("token:", auth.user?.access_token);

  const [studentDetail, setStudentDetail] = useState<any>(null);
  const [studentImage, setStudentImage] = useState<any>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const fectStudentDetail = async () => {
    const result = await axios.get(
      `${conf.urlPrefix}/psu-api/studentDetail`,
      {
        headers: {
          token: auth.user?.access_token,
        },
      }
    );
    setStudentDetail(result.data.data[0]);
    const imgresult = await axios.get(
      `${conf.urlPrefix}/psu-api/studentImage`,
      {
        headers: {
          token: auth.user?.access_token,
        },
      }
    );
    setStudentImage(imgresult.data.data[0]);
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      fectStudentDetail();
    }
  }, [auth.isAuthenticated, auth.user]);

  console.log(studentDetail);
  console.log(studentImage);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  if (!auth.isAuthenticated) {
    return <div>Please Login First</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen background-image">
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">ข้อมูลส่วนตัว</h1>
        <div className="flex flex-row">
          <div className="mr-14">
            {studentImage && studentImage.pictureBase64 && (
              <Image
                src={`data:image/png;base64,${studentImage.pictureBase64}`}
                alt="Student Image"
                width={200}
                height={200}
                className="rounded-md" //rounded-full
              />
            )}
          </div>

          <div>
            {studentDetail ? (
              <div>
                <div>
                  <h1>
                    ชื่อ-สกุล : {studentDetail.titleNameThai}
                    {studentDetail.studNameThai} {studentDetail.studSnameThai}
                  </h1>
                  <h1>รหัสนักศึกษา : {studentDetail.studentId}</h1>
                  <h1>คณะ : {studentDetail.facNameThai}</h1>
                  <h1>สาขาวิชา : {studentDetail.majorNameThai}</h1>
                  <h1>ชั้นปีการศึกษา : {studentDetail.yearStatus}</h1>
                </div>
                {showDetails &&
                  Object.entries(studentDetail).map(([key, value]) => (
                    <div key={key}>
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
                <h1>
                  ประเภททุนการศึกษา : <DropdownPF />
                </h1>
                <h1 className="py-2">
                  ที่อยู่ปัจจุปัน : <DropdownPF />
                </h1>
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

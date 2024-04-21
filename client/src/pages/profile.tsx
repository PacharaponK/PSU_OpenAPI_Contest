"use client";

import axios from "axios";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import Image from "next/image";

function Profile() {
  const auth = useAuth();
  const app = useRouter();
  console.log("token:", auth.user?.access_token);

  const [studentDetail, setStudentDetail] = useState<any>(null);
  const [studentImage, setStudentImage] = useState<any>(null);
  const fectStudentDetail = async () => {
    const result = await axios.get(
      `https://api-gateway.psu.ac.th/Test/regist/level2/StudentDetailCampus/01/token`,
      {
        headers: {
          credential: "api_key=ARdj9JMA3UHQLwABr+Vv5JfuJCBZXr81",
          token: auth.user?.access_token,
        },
      }
    );
    setStudentDetail(result.data.data[0]);
    const imgresult = await axios.get(
      `https://api-gateway.psu.ac.th/Test/regist/level2/StudentImage/token`,
      {
        headers: {
          credential: "api_key=ARdj9JMA3UHQLwABr+Vv5JfuJCBZXr81",
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

  if (!auth.isAuthenticated) {
    return <div>Please Login First</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">ข้อมูลส่วนตัว</h1>
        <div className="flex flex-row">
          {studentDetail ? (
            <>
              <div className="mr-4">
                {studentImage && studentImage.pictureBase64 && (
                  <Image
                    src={`data:image/png;base64,${studentImage.pictureBase64}`}
                    alt="Student Image"
                    width={200}
                    height={200}
                  />
                )}
              </div>
              <div>
                {Object.entries(studentDetail).map(([key, value]) => (
                  <div key={key}>
                    <h1>
                      {key}: {String(value)}
                    </h1>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

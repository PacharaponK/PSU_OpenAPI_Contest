import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useAuth } from "react-oidc-context";
import conf from "@/conf/main";
import { studentDetail, studentImage } from "@/modules/student";

interface StudentContextType {
  studentDetail: studentDetail | null;
  studentImage: studentImage | null;
  setStudentDetail: (detail: studentDetail | null) => void;
  setStudentImage: (image: studentImage | null) => void;
  fetchStudentDetail: () => Promise<void>;
}

const StudentContext = createContext<StudentContextType | null>(null);

export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("จะใช้ useStudentContext ต้องอยู่ใน StudentProvider");
  }
  return context;
};

export const StudentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();
  const [studentDetail, setStudentDetail] = useState<studentDetail | null>(
    null
  );
  const [studentImage, setStudentImage] = useState<studentImage | null>(null);

  const fetchStudentDetail = async () => {
    try {
      const detailResult = await axios.get(
        `${conf.urlPrefix}/psu-api/studentDetail`,
        {
          headers: {
            token: auth.user?.access_token,
          },
        }
      );
      setStudentDetail(detailResult.data.data[0]);

      const imageResult = await axios.get(
        `${conf.urlPrefix}/psu-api/studentImage`,
        {
          headers: {
            token: auth.user?.access_token,
          },
        }
      );
      setStudentImage(imageResult.data.data[0]);
    } catch (error) {
      console.error("fetchStudentDetailไม่ได้:", error);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchStudentDetail();
    }
  }, [auth.isAuthenticated, auth.user]);

  const value: StudentContextType = {
    studentDetail,
    studentImage,
    setStudentDetail,
    setStudentImage,
    fetchStudentDetail,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

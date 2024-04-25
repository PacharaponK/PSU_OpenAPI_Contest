import { z, ZodNullable, ZodObject, ZodFunction } from "zod";

const StudentDetailSchema = z.object({
  studentId: z.string(),
  entMethod: z.string(),
  entMethodDesc: z.string(),
  groupId: z.string(),
  admitTerm: z.string(),
  admitYear: z.string(),
  admitDate: z.string(),
  sexCode: z.string(),
  titleId: z.string(),
  titleNameThai: z.string(),
  titleShortEng: z.string(),
  studNameThai: z.string(),
  studSnameThai: z.string(),
  studNameEng: z.string(),
  studSnameEng: z.string(),
  studyStatus: z.string(),
  statusDescThai: z.string(),
  stillStudent: z.string(),
  yearStatus: z.string(),
  nationality: z.string(),
  citizenId: z.string(),
  majorId: z.string(),
  majorNameThai: z.string(),
  majorNameEng: z.string(),
  deptId: z.string(),
  deptNameThai: z.string(),
  deptNameEng: z.string(),
  facId: z.string(),
  facNameThai: z.string(),
  facNameEng: z.string(),
  campusId: z.string(),
  campusNameThai: z.string(),
  campusNameEng: z.string(),
  coursePlanId: z.string(),
  studyLevelId: z.string(),
  studyLevelName: z.string(),
  studyTypeId: z.string(),
  studyTypeName: z.string(),
  studyPlanId: z.string().nullable(),
  studyPlanName: z.string().nullable(),
  coursePlanDetail: z.string().nullable(),
  regularYear: z.string().nullable(),
  expandYear: z.string().nullable(),
  courseCategoryId: z.string().nullable(),
  courseCategoryNameThai: z.string().nullable(),
  courseCategoryNameEng: z.string().nullable(),
  degreeId: z.string().nullable(),
  degreeNameThai: z.string(),
  degreeNameEng: z.string(),
  gradYear: z.string().nullable(),
  gradDate: z.string().nullable(),
  honourId: z.string().nullable(),
  oecDate: z.string().nullable(),
  birthDate: z.string(),
  birthPlaceEng: z.string(),
  birthPlaceThai: z.string(),
  fieldOfStudyThai: z.string(),
  fieldOfStudyEng: z.string(),
  subMajorNameThai: z.string().nullable(),
  subMajorNameEng: z.string().nullable(),
  minorNameThai: z.string().nullable(),
  minorNameEng: z.string().nullable(),
  majorMinorNameThai: z.string(),
});

const StudentImageSchema = z.object({
  studentId: z.string(),
  pictureBase64: z.string(),
});

// export const StudentContextTypeSchema = z.object({
//   studentDetail: StudentDetailSchema.nullable(),
//   studentImage: StudentImageSchema.nullable(),
//   setStudentDetail: z.function(
//     z.tuple([StudentDetailSchema.nullable()]),
//     z.undefined()
//   ),
//   setStudentImage: z.function(
//     z.tuple([StudentImageSchema.nullable()]),
//     z.undefined()
//   ),
//   fetchStudentDetail: z.function(z.tuple([]), z.undefined()),
// });

// export type StudentContextType = z.infer<typeof StudentContextTypeSchema>;
export type studentImage = z.infer<typeof StudentImageSchema>;
export type studentDetail = z.infer<typeof StudentDetailSchema>;
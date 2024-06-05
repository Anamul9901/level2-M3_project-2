import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemister.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //academicSemesterNameCodeMapper['Fall']
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findOne({ id });
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  academicSemester: TAcademicSemester,
) => {
  //academicSemesterNameCodeMapper['Fall']
  if (academicSemesterNameCodeMapper[academicSemester.name] !== academicSemester.code) {
    throw new Error('Invalid Semester Code');
  }
  const result = await AcademicSemester.updateOne({ id }, academicSemester);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};

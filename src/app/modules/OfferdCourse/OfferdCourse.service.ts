import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistraton } from '../semesterRegistration/semisterRegestation.model';
import { TOfferedCourse } from './OfferdCourse.interface';
import { OfferedCourse } from './OfferdCourse.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../Course/course.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    // faculty,
  } = payload;
  // check if the semester registration id is exists!
  const isSemesterRegistrationExits =
    await SemesterRegistraton.findById(semesterRegistration);

  if (!isSemesterRegistrationExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found !',
    );
  }

  const academicSemester = isSemesterRegistrationExits.academicSemester;

  // check if the academic faculty id is exists!
  console.log(academicFaculty);
  const isAcademicFacultyExits =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found !');
  }

  // check if the academic department id is exists!
  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found !');
  }

  // check if the course id is exists!
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found !');
  }

  //   // check if the faculty id is exists!
  //   const isFacultyExi =
  //     await AcademicDepartment.findById(academicFaculty);

  //   if (!isAcademicDepartment) {
  //     throw new AppError(
  //       httpStatus.NOT_FOUND,
  //       'Academic Department not found !',
  //     );
  //   }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCourseIntoDB = async (query: Record<string, unknown>) => {};

const getSingleOfferedCourseIntoDB = async (id: string) => {};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseIntoDB,
  getSingleOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
};

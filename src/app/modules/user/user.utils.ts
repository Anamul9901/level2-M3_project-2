import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  //2030030001 => fixed[203003] change[0001]
  // substring(6) means 1st 6 digit debe
  return lastStudent?.id ? lastStudent.id : undefined;
};

//year semesterCode 4 digit number
export const generateStudentId = async (payload: TAcademicSemester | null) => {
  // padStart(4, '0') eikhane 4 ta sonkha nebe. R toString er age joto thakbe toto bosya ager sobgula 0 kore debe.
  let currentId = (0).toString(); // 0000 by default

  const lastStudentId = await findLastStudentId(); // 2030 01 0001

  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload?.code;
  const currentYear = payload?.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6); // 000001
  }
  let incrementId = (parseInt(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload?.year}${payload?.code}${incrementId}`;

  return incrementId;
};

import { TAcademicSemesterCode, TAcademicSemesterName, TAcademicSemesterNameCondeMapper, TMonths } from "./academicSemester.interface";

export const Months: TMonths[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  
  export const AcademicSemesterName: TAcademicSemesterName[] = [
    'Autume',
    'Summar',
    'Fall',
  ];
  
  export const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

  export const academicSemesterNameCodeMapper: TAcademicSemesterNameCondeMapper = {
    Autume: '01',
    Summar: '02',
    Fall: '03',
  };
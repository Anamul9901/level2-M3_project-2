import { z } from 'zod';

const createUsrserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20, {
    message: 'First name must be less than 20 characters',
  }),
  middleName: z.string().trim().optional(),
  lastName: z.string(),
});

const createGuardianVAlidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const createStudentValdattionSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createUsrserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emargencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1),
      permanentAddres: z.string().min(1),
      guardian: createGuardianVAlidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      profileImg: z.string().url().optional(),
      admissionSemester: z.string(),
    }),
  }),
});

// update User
const updateUsrserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20, {
      message: 'First name must be less than 20 characters',
    })
    .optional(),
  middleName: z.string().trim().optional(),
  lastName: z.string().optional(),
}).optional();

const updateGuardianVAlidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
}).optional();

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
}).optional();

const updateStudentValdattionSchema = z.object({
  body: z.object({
    // password: z.string().max(20).optional(),  // derect aivabe update korbo nah. futeure e update korbo
    student: z.object({
      name: updateUsrserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emargencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1).optional(),
      permanentAddres: z.string().min(1).optional(),
      guardian: updateGuardianVAlidationSchema,
      localGuardian: updateLocalGuardianValidationSchema,
      profileImg: z.string().url().optional(),
      admissionSemester: z.string().optional(),
    }),
  }),
});

export const studentValdattion = {
  createStudentValdattionSchema,
  updateStudentValdattionSchema,
};

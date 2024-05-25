import { z } from 'zod'

const userNameValidationSchema = z.object({
  firstName: z.string().max(20, {
    message: 'First name must be less than 20 characters',
  }),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
})

const guardianVAlidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
})

const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
})

const studentValdattionSchema = z.object({
  id: z.string(),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string(),
  emargencyContactNo: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string().min(1),
  permanentAddres: z.string().min(1),
  guardian: guardianVAlidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().url().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
})

export default studentValdattionSchema

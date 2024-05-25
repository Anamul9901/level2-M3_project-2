import { z } from 'zod';

const userValidationSchema = z.object({
//   id: z.string(), //id auto server theke create hobe, ta eikahne id hobe nah
  password: z
    .string({
        invalid_type_error: "Password must be a string"
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(), // password fronten theke aste o pare abar nao aste pare. tai optional kore debo.
//   needsPasswordChange: z.boolean().optional().default(true),
//   role: z.enum(['student', 'faculty', 'admin']),
//   stats: z.enum(['in-progress', 'blocked']),
//   isDeleted: z.boolean().optional().default(false),
});

export const UserValidation = {
    userValidationSchema
}

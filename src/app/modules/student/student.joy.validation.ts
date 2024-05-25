import Joi from 'joi'

const userNameVAlidationSchema = Joi.object({
  firstName: Joi.string().trim().max(20).required(),
  middleName: Joi.string().trim().allow(''),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-Z]+$/),
})

const guardianVAlidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
})

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
})

const studentVAlidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameVAlidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.string().required(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emargencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required(),
  presentAddress: Joi.string().required(),
  permanentAddres: Joi.string().required(),
  guardian: guardianVAlidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().uri().required(),
  isActive: Joi.string()
    .valid('active', 'blocked')
    .default('active')
    .required(),
})

export default studentVAlidationSchema

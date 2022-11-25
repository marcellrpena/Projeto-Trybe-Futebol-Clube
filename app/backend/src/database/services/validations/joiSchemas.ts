// const Joi = require('joi');
import * as Joi from 'joi';

const FILLED = 'All fields must be filled';
const INCORRECT = 'Incorrect email or password';

const emailSchema = Joi
  .string()
  .email()
  .required()
  .messages({
    'string.empty': FILLED,
    'any.required': FILLED,
    'string.email': INCORRECT,
    'string.base': INCORRECT,
  });
const passwordSchema = Joi
  .string()
  .min(6)
  .required()
  .messages({
    'string.base': INCORRECT,
    'string.min': INCORRECT,
    'string.empty': FILLED,
    'any.required': FILLED,
  });
const imageSchema = Joi.string();
const idSchema = Joi.number().min(1).required();
const categoryNameSchema = Joi.string().required();

const titleSchema = Joi.string().required();
const contentSchema = Joi.string().required();
const categoryIdSchema = Joi.array().min(1).required();

const postSchema = Joi.object({
  title: titleSchema,
  content: contentSchema,
  categoryIds: categoryIdSchema,
});

const updatePostSchema = Joi.object({
  title: titleSchema,
  content: contentSchema,
});

const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const categorySchema = Joi.object({
  name: categoryNameSchema,
});

const displayNameSchema = Joi.string().min(8).required();

const inputUserSchema = Joi.object({
  displayName: displayNameSchema,
  email: emailSchema,
  password: passwordSchema,
  image: imageSchema,
});

export {
  loginSchema,
  inputUserSchema,
  idSchema,
  categorySchema,
  postSchema,
  updatePostSchema,
};

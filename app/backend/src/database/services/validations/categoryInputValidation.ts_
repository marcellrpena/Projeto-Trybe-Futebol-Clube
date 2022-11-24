const errorMessage = require('../../helpers/errorMessage');
const statusCode = require('../../helpers/statusCode');
const { Category } = require('../../models');
const { categorySchema } = require('./joiSchemas');

const validateCategory = async (data) => {
  const { name } = data;
  const { error } = categorySchema.validate(data);
  if (error) return { status: statusCode.BAD_REQUEST, message: { message: error.message } };
  const findCat = await Category.findOne({ where: { name } });
  if (findCat) return { status: statusCode.CONFLICT, message: errorMessage.nameExist };
  return { status: null };
};

module.exports = {
  validateCategory,
};
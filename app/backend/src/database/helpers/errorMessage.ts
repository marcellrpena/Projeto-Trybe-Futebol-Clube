const errorMessages = {
  required: { message: 'Some required fields are missing' },
  invalidField: { message: 'Incorrect email or password' },
  emailExist: { message: 'User already registered' },
  nameExist: { message: 'Category already registered' },
  userNotExist: { message: 'User does not exist' },
  categoryNotFound: {
    message: 'one or more "categoryIds" not found',
  },
  postNotExist: { message: 'Post does not exist' },
  badUser: {
    message: 'Unauthorized user',
  },
};

export default errorMessages;

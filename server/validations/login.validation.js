const Joi = require("@hapi/joi");

const registerSchema = Joi.object().keys({
  userName: Joi.string().min(1).max(50).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object().keys({
  userName: Joi.string().min(1).max(50).required(),
  password: Joi.string().required(),
});

const validationsObj = {
  register: (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      console.log(error.details);
      return next(error.details);
    }
    return next();
  },
  login: (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      console.log(error.details);
      return next(error.details);
    }
    return next();
  },
};

function getValidationFunction(path) {
  return validationsObj[path];
}

module.exports = getValidationFunction;

const Joi = require("@hapi/joi");
const createVacationSchema = Joi.object().keys({
  destination: Joi.string().min(1).max(250).required(),
  description: Joi.string().required(),
  from: Joi.string().required(),
  to: Joi.string().required(),
  price: Joi.number().required(),
});

const validationsObj = {
  createVacation: (req, res, next) => {
    const { error } = createVacationSchema.validate(req.body);
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

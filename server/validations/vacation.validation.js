const Joi = require("@hapi/joi");
const createVacationSchema = Joi.object().keys({
  destination: Joi.string().min(3).max(250).required(),
  description: Joi.string().required(),
  startAt: Joi.string().required(),
  endAt: Joi.string().required(),
  price: Joi.number().required(),
  file: Joi.optional(),
});

const followSchema = Joi.object().keys({
  vacationId: Joi.number().required().min(1),
});

const deleteSchema = Joi.object().keys({
  vacationId: Joi.number().required().min(1),
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
  followSchema: (req, res, next) => {
    const { error } = followSchema.validate(req.body);
    if (error) {
      console.log(error.details);
      return next(error.details);
    }
    return next();
  },
  deleteSchema: (req, res, next) => {
    const { error } = deleteSchema.validate(req.params);
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

import Joi from 'joi';

export function validateRegister(reqBody) {
  const Schema = Joi.object({
    name: Joi.string().min(2).max(50).required().label('Name').messages({
      'string.empty': 'The "Name" field is required.',
      'string.min': 'The "Name" field must be at least 2 characters.',
      'string.max':
        'The "Name" field must be less than or equal to 50 characters.',
    }),
    email: Joi.string().email().required().label('Email').messages({
      'string.empty': 'The "Email" field is required.',
      'string.email': 'Please enter a valid email.',
    }),
    password: Joi.string()
      .min(8)
      .max(50)
      .required()
      .label('Password')
      .messages({
        'string.empty': 'The "Password" field is required.',
        'string.min': 'The "Password" field must be at least 8 characters.',
        'string.max':
          'The "Password" field must be less than or equal to 50 characters.',
      }),
    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Re-entered password')
      .messages({
        'any.only': 'The passwords do not match.',
      }),
  });

  return Schema.validate(reqBody);
}

export function validateLogin(reqBody) {
  const Schema = Joi.object({
    email: Joi.string().email().required().label('Email').messages({
      'string.empty': 'The "Email" field is required.',
      'string.email': 'Please enter a valid email.',
    }),
    password: Joi.string()
      .min(8)
      .max(50)
      .required()
      .label('Password')
      .messages({
        'string.empty': 'The "Password" field is required.',
        'string.min': 'The "Password" field must be at least 8 characters.',
        'string.max':
          'The "Password" field must be less than or equal to 50 characters.',
      }),
  });

  return Schema.validate(reqBody);
}

export function validateExercise(reqBody) {
  const Schema = Joi.object({
    name: Joi.string()
      .regex(/^[a-z0-9 ]+$/i)
      .required()
      .max(100)
      .label('Name')
      .messages({
        'string.pattern.base':
          'The exercise name can only contain alpha-numeric characters and spaces.',
        'string.empty': 'The exercise name is required.',
        'string.max': 'The exercise name must be less than 100 characters.',
      }),
    sets: Joi.string().required().regex(/^\d+$/).max(2).label('Sets').messages({
      'string.empty': 'Sets field is required.',
      'string.max': 'Sets field must be less than 100.',
      'string.pattern.base': 'Sets field must contain numbers only.',
    }),
    reps: {
      method: Joi.string().label('Reps Method'),
      value: Joi.string()
        .required()
        .regex(/^\d+$/)
        .max(3)
        .label('Reps Value')
        .messages({
          'string.empty': 'Reps field is required.',
          'string.max': 'Reps field must be less than 1000.',
          'string.pattern.base': 'Reps field must contain numbers only.',
        }),
    },
    weight: Joi.string().regex(/^\d+$/).max(4).label('Weight').messages({
      'string.max': 'Weight field must be less than 10000.',
      'string.pattern.base': 'Weight field must contain numbers only.',
    }),
    rest: Joi.string().regex(/^\d+$/).max(5).label('Rest').messages({
      'string.max': 'Rest field must be less than 100000.',
      'string.pattern.base': 'Rest field must contain numbers only.',
    }),
  });

  return Schema.validate(reqBody);
}

export function validateExerciseProgress(reqBody) {
  const Schema = Joi.object({
    sets: Joi.string().required().regex(/^\d+$/).max(2).label('Sets').messages({
      'string.empty': 'Sets field is required.',
      'string.max': 'Sets field must be less than 100.',
      'string.pattern.base': 'Sets field must contain numbers only.',
    }),
    reps: {
      value: Joi.string()
        .required()
        .regex(/^\d+$/)
        .max(3)
        .label('Reps Value')
        .messages({
          'string.empty': 'Reps field is required.',
          'string.max': 'Reps field must be less than 1000.',
          'string.pattern.base': 'Reps field must contain numbers only.',
        }),
    },
    weight: Joi.string().regex(/^\d+$/).max(4).label('Weight').messages({
      'string.max': 'Weight field must be less than 10000.',
      'string.pattern.base': 'Weight field must contain numbers only.',
    }),
    rest: Joi.string().regex(/^\d+$/).max(5).label('Rest').messages({
      'string.max': 'Rest field must be less than 100000.',
      'string.pattern.base': 'Rest field must contain numbers only.',
    }),
  });

  return Schema.validate(reqBody);
}

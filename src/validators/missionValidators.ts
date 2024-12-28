import Joi, { ObjectSchema } from "joi";

export const createMissionSchema: ObjectSchema = Joi.object({
    title: Joi.object({
        ar: Joi.string()
            .required()
            .min(3)
            .max(250)
            .trim()
            .messages({
                'string.min': 'title in Arabic must be at least 3 characters long',
                'string.max': 'title in Arabic cannot exceed 200 characters',
                'any.required': 'title in Arabic is required',
                'string.empty': 'title in Arabic cannot be empty',
            }),
        en: Joi.string()
            .required()
            .min(3)
            .max(250)
            .trim()
            .messages({
                'string.min': 'title in English must be at least 3 characters long',
                'string.max': 'title in English cannot exceed 200 characters',
                'any.required': 'title in English is required',
                'string.empty': 'title in English cannot be empty',
            }),
    })
        .required()
        .messages({
            'any.required': 'Titles are required',
            'object.base': 'Titles must be an object with ar and en properties',
        }),
    description: Joi.object({
        ar: Joi.string()
            .required()
            .min(10)
            .max(1000)
            .trim()
            .messages({
                'string.min': 'description in Arabic must be at least 10 characters long',
                'string.max': 'description in Arabic cannot exceed 1000 characters',
                'any.required': 'description in Arabic is required',
                'string.empty': 'description in Arabic cannot be empty',
            }),
        en: Joi.string()
            .required()
            .min(10)
            .max(1000)
            .trim()
            .messages({
                'string.min': 'description in English must be at least 10 characters long',
                'string.max': 'description in English cannot exceed 1000 characters',
                'any.required': 'description in English is required',
                'string.empty': 'description in English cannot be empty',
            }),
    })
        .required()
        .messages({
            'any.required': 'Descriptions are required',
            'object.base': 'Descriptions must be an object with ar and en properties',
        }),
    platformID: Joi.number()
        .required()
        .messages({
            'any.required': 'The Platform ID is required',
        }),
    stars: Joi.number()
        .min(1)
        .max(5)
        .required()
        .messages({
            'string.min': 'Stars should be 1 to 5 stars per mission',
            'string.max': 'Stars should be 1 to 5 stars per mission',
            'any.required': 'The stars count is required',
        }),
    expirationDate: Joi.date()
        .greater('now')
        .required()
        .messages({
            'date.base': 'Expiration date must be a valid date.',
            'date.greater': 'Expiration date must be in the future.',
            'any.required': 'Expiration date is required.',
        }),
    status: Joi.string()
        .valid('active', 'disabled', 'finished')
        .required()
        .messages({
            'any.only': 'Status must be one of the following: active, disabled, or finished.',
            'any.required': 'Status is required.',
            'string.base': 'Status must be a string.',
        }),
    type: Joi.string()
        .valid('Strike', 'Support')
        .required()
        .messages({
            'any.only': 'Type must be one of the following: Strike or Support.',
            'any.required': 'Type is required.',
            'string.base': 'Type must be a string.',
        }),
    mission_Link: Joi.string()
        .uri()
        .required()
        .messages({
            'any.required': 'Mission Link is required.',
            "string.base": "The 'mission Link' field must be a valid URI string.",
        }),
    actions: Joi.object()
        .required()
        .messages({
            'any.required': 'Actions list is required.',
            "object.base": "The 'actions' field must be a valid JSON object.",
        }),
});

export const updateMissionSchema = Joi.object({
    title: Joi.object({
        en: Joi.string().optional().messages({
            "string.base": "Title in English must be a string.",
        }),
        ar: Joi.string().optional().messages({
            "string.base": "Title in Arabic must be a string.",
        })
    }).optional().messages({
        "object.base": "Title must be an object with 'en' and 'ar' properties."
    }),

    description: Joi.object({
        en: Joi.string().optional().messages({
            "string.base": "Description in English must be a string.",
        }),
        ar: Joi.string().optional().messages({
            "string.base": "Description in Arabic must be a string.",
        })
    }).optional().messages({
        "object.base": "Description must be an object with 'en' and 'ar' properties."
    }),

    platformID: Joi.number()
        .integer()
        .optional()
        .messages({
            "number.base": "Platform ID must be a valid number.",
            "number.integer": "Platform ID must be an integer."
        }),

    stars: Joi.number()
        .integer()
        .min(0)
        .optional()
        .messages({
            "number.base": "Stars must be a valid number.",
            "number.min": "Stars must be greater than or equal to 0.",
            "number.integer": "Stars must be an integer."
        }),

    expirationDate: Joi.date()
        .optional()
        .messages({
            "date.base": "Expiration date must be a valid date."
        }),

    status: Joi.string()
        .valid("active", "disabled", "finished")
        .optional()
        .messages({
            "string.base": "Status must be a string.",
            "any.only": "Status must be one of 'active', 'disabled', or 'finished'."
        }),

    type: Joi.string()
        .valid("Strike", "Support")
        .optional()
        .messages({
            "string.base": "Type must be a string.",
            "any.only": "Type must be either 'Strike' or 'Support'."
        }),

    mission_Link: Joi.string().uri().optional().messages({
        "string.base": "The 'mission_Link' field must be a valid URI string.",
    }),
    actions: Joi.object().optional().messages({
        "object.base": "The 'actions' field must be a valid JSON object.",
    }),
}).or(
    "title",
    "description",
    "platformID",
    "stars",
    "expirationDate",
    "status",
    "type",
    "actions",
    "actions",
    "mission_Link"
).messages({
    "object.missing": "At least one field must be provided for update."
});

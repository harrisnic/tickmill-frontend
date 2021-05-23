import {extend, ValidationProvider} from 'vee-validate'
import {confirmed, email, integer, min, numeric, required} from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en'

extend('required', {
    ...required,
    message: 'forms.exception.required',
})
extend('email', {
    ...email,
    message: 'forms.exception.email',
})
extend('min', {
    ...min,
    message: en.messages['min'],
})
extend('integer', {
    ...integer,
    message: en.messages['integer'],
})
extend('confirmed', {
    ...confirmed,
    message: 'forms.exception.confirmed_password',
})
extend('numeric', {
    ...numeric,
    message: 'forms.exception.numeric',
})
extend('required-all', {
    computesRequired: true,
    validate: value => {
        if (value && value.constructor === Object) {
            return Object.entries(value).length > 0
        }
        return required.validate(value).valid
    },
    message: field => `The field ${field} is required`,
})
extend('currency', {
    validate(value) {
        if (value === 0) {
            return true
        }
        if (value) {
            return /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/.test(value)
        } else {
            return false
        }
    },
    message: 'Only currency format allowed',
})
extend('strong-password', {
    validate(value) {
        // (?=.*(_|[^\w])) for special characters
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.{8,15}).+$/.test(value)
    },
    message: 'forms.exception.password',
})
extend('decimal', {
    validate: (value, {decimals = '*', separator = '.'} = {}) => {
        if (value === null || value === undefined || value === '') {
            return {
                valid: false,
            }
        }
        if (Number(decimals) === 0) {
            return {
                valid: /^-?\d*$/.test(value),
            }
        }
        const regexPart = decimals === '*' ? '+' : `{1,${decimals}}`
        const regex = new RegExp(`^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`)

        return {
            valid: regex.test(value),
        }
    },
    message: field => `The ${field} field must contain only decimal values`,
})

export default ValidationProvider

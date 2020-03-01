import { ValidatorOptions } from "class-validator";

class DefaultValidator implements ValidatorOptions {
    validationError = {
        target: false
    }
}

export default new DefaultValidator();
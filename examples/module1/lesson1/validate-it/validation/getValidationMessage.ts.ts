import { VALID, EMPTY_OR_NONINTIGER, INVALID_NUMBER } from "./messages"; 
import { isEmpty, isIntiger, isOddNumber, isBetweenNumbers } from "./validators";


export default function getValidationMessage(value: string): string {
    if (isEmpty(value) 
        || !isIntiger(value))
        return EMPTY_OR_NONINTIGER;
    else if (isOddNumber(Number(value)) 
        || !isBetweenNumbers(0, 100, Number(value)))
        return INVALID_NUMBER;
    return VALID;
}
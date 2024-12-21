export function formValidator(
  firstName: string,
  lastName: string,
  age: number
) {
  const errors: string[] = [];

  if (!firstName) {
    errors.push('First name is required');
  }

  if (!lastName) {
    errors.push('Last name is required');
  }

  if (age < 0) {
    errors.push('Age must be a positive number');
  }

  if (firstName.length < 2) {
    errors.push('First name must be at least 2 character');
  }

  if (lastName.length < 2) {
    errors.push('Last name must be at least 2 character');
  }
  
  if (isNaN(age)) {
    throw new Error('Age must be a number');
  }

  return errors;
}

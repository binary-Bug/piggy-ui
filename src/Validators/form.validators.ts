import { AbstractControl } from '@angular/forms';

export const roleSelectionRequired = (control: AbstractControl) => {
  if (control.value === 'none') {
    return { required: true };
  }
  return null;
};

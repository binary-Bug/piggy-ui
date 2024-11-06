import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(UserService).isUserLoggedIn()) return true;
  inject(ToastrService).warning(
    'You must be Logged In to access this page',
    'Warning',
    {
      timeOut: 5000,
    }
  );
  inject(Router).navigateByUrl('');
  return false;
};

import { HttpErrorResponse } from '@angular/common/http';

export function setErrorMessage(err: HttpErrorResponse) {
  if (err) {
    if (err.error instanceof ErrorEvent) {
      console.log(
        'A client-side or network error occurred:',
        err.error.message
      );
      return `Error: ${err.error.message}`;
    } else {
      const status = err.status;
      if (status === 401) {
        console.log('Unauthorized access - please log in.');
        return 'Unauthorized access - please log in.';
      }
      if (status === 404) {
        console.log('Resource not found - please check the URL.');
        return 'Resource not found - please check the URL.';
      }
      if (status > 500 && status < 600) {
        console.log('Server error - please try again later.');
        return 'Server error - please try again later.';
      }
      return `Error ${status}: ${
        err.message || 'An unexpected error occurred.'
      }`;
    }
  } else {
    return '';
  }
}

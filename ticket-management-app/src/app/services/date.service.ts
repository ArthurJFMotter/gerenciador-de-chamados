import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  formatDate(dateTimeString: string): string {
    console.log("Received dateTimeString:", dateTimeString);

    // Ensure the input format is "dd/mm/yyyy - dd:mm:ss"
    const datePart = dateTimeString.split(' - ')[0];
    return datePart;
  }

}

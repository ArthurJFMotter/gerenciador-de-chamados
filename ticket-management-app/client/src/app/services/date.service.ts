import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

   formatDateToDayMonthYear(dateString: string): string | null {
    // Expected date string format: "dd/mm/yyyy - hh:mm:ss"

    if (!dateString) {
      return null;
    }

    try {
      // Split the string at the space to separate the date and time parts
      const parts = dateString.split(" - ");
      if (parts.length !== 2) {
        return null;
      }

      const datePart = parts[0];

      // Validate the date format using a regular expression
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dateRegex.test(datePart)) {
        return null;
      }


      return datePart; // Return only the "dd/mm/yyyy" part

    } catch (error) {
      console.error("Error parsing date:", error);
      return null;
    }
  }

   formatDateToValidISO(dateString: string): string | null {
    if (!dateString) {
      return null;
    }

    try {
      const parts = dateString.split(" - ");
      if (parts.length !== 2) {
        return null;
      }

      const [datePart, timePart] = parts;

      const [day, month, year] = datePart.split("/");
      const [hours, minutes, seconds] = timePart.split(":");


      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    } catch (error) {
      console.error("Error formatting to valid ISO:", error);
      return null;
    }
  }


   timeSince(dateString: string): string {

    if (!dateString) {
      return 'Never';
    }

    try {
      const parsedDate = new Date(dateString);
      if (isNaN(parsedDate.getTime())) {
        return 'Invalid Date';
      }

      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - parsedDate.getTime()) / 1000);

      if (diffInSeconds < 60) {
        return `${diffInSeconds}s`;
      }

      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) {
        return `${diffInMinutes}min`;
      }

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return `${diffInHours}h`;
      }

      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 30) {
        return `${diffInDays}d`;
      }

      const diffInMonths = this.diffInMonths(parsedDate, now);
      return `${diffInMonths}m`;
    } catch (error) {
      console.error("Error calculating time since:", error);
      return 'Invalid Date';
    }
  }


  private diffInMonths(parsedDate: Date, now: Date): number {
    let months = (now.getFullYear() - parsedDate.getFullYear()) * 12;
    months -= parsedDate.getMonth();
    months += now.getMonth();

    return months <= 0 ? 0 : months;
  }

   parseDate(dateString: string | null): Date | null {
      if (!dateString) {
          return null
        }
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

   parseISOString(dateString: string | null): Date | null {
     if (!dateString) {
          return null;
        }
      return new Date(dateString);
  }
}
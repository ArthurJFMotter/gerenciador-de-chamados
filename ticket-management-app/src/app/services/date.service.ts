import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  timeSince(isoDateString: string): string {
    if (!isoDateString) {
      return 'N/A';
    }

    try {
      const pastDate = new Date(isoDateString);
      const now = new Date();

      const timeDiffInSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

      if (isNaN(timeDiffInSeconds)) {
        return 'Invalid Date'
      }
      if (timeDiffInSeconds < 0) {
        return 'In the Future';
      }

      if (timeDiffInSeconds < 60) {
        return `${timeDiffInSeconds} s`;
      } else if (timeDiffInSeconds < 3600) {
        const minutes = Math.floor(timeDiffInSeconds / 60);
        return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
      } else if (timeDiffInSeconds < 86400) {
        const hours = Math.floor(timeDiffInSeconds / 3600);
        return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
      } else if (timeDiffInSeconds < 2592000) {  // Less than 30 days
        const days = Math.floor(timeDiffInSeconds / 86400);
        return `${days} ${days === 1 ? 'dia' : 'dias'}`;
      } else if (timeDiffInSeconds < 31536000) { // Less than 1 year
        const months = Math.floor(timeDiffInSeconds / 2592000); //Approx 30 days a month
        return `${months} ${months === 1 ? 'mês' : 'meses'}`;
      } else {
        const years = Math.floor(timeDiffInSeconds / 31536000);
        return `${years} ${years === 1 ? 'ano' : 'anos'}`;
      }
    } catch (error) {
      console.error("Error parsing or calculating date:", error);
      return "Invalid Date";
    }
  }
}

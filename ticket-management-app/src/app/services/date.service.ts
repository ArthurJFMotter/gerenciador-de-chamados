import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  formatDate(dateTimeString: string): string {
    /*debug*/ //console.log("Received dateTimeString:", dateTimeString);

    // Ensure the input format is "dd/mm/yyyy - dd:mm:ss"
    const datePart = dateTimeString.split(' - ')[0];
    return datePart;
  }

  timeSince(dateTimeString: string): string {
    if (!dateTimeString) {
      return 'N/A';
    }

    try {
      const [datePart, timePart] = dateTimeString.split(' - ');
      if (!datePart || !timePart) {
        return "Invalid Date/Time Format";
      }

        const [day, month, year] = datePart.split('/').map(Number);
        const [hour, minute, second] = timePart.split(':').map(Number);

        const pastDate = new Date(year, month - 1, day, hour, minute, second);
        const now = new Date();

        const timeDiffInSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

        if(isNaN(timeDiffInSeconds)){
          return 'Invalid Date'
        }

      if(timeDiffInSeconds < 0){
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

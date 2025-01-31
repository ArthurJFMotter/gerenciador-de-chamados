import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  http = inject(HttpClient);

  //PLACEHOLDER FOR ACTUAL DB TO API CALLS
  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>('assets/tickets.json');
  }
  
  //PLACEHOLDER FOR ACTUAL DB TO API CALLS
  getTicketById(id: string): Observable<Ticket | undefined> {
    return this.http.get<Ticket[]>(`assets/tickets.json`).pipe(
      map(tickets => tickets.find(ticket => ticket.id === id))
    )
  }

}
export interface Ticket {
  position: number;
  id: string;
  request: string;
  status: string;
  queue: string;
  createdDate: string; // ISO 8601 date string "yyyyMMddHHmmssff"
  lastInteraction: string; // ISO 8601 date string "yyyyMMddHHmmssff"
  responsible?: string;
  requesterName: string;
  locationName: string;
  locationRegion: string;
  //communication: Communication[];
  //history: History[];
}

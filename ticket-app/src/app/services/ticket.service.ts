import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  http = inject(HttpClient);

  //PLACEHOLDER FOR ACTUAL DB TO API CALLS
  getTickets(isArchived?: boolean): Observable<Ticket[]> {
    return this.http.get<Ticket[]>('assets/tickets.json').pipe(
      map(tickets => {
        if (isArchived === undefined || null || false) {
          return tickets;
        }
        return tickets.filter(ticket => ticket.isArchived === isArchived);
      })
    );
  }

  //PLACEHOLDER FOR ACTUAL DB TO API CALLS
  getArchivedTickets(): Observable<Ticket[]> {
    return this.getTickets(true);
  }

  //PLACEHOLDER FOR ACTUAL DB TO API CALLS
  getTicketById(id: string): Observable<Ticket | undefined> {
    return this.http.get<Ticket[]>(`assets/tickets.json`).pipe(
      map(tickets => tickets.find(ticket => ticket.id === id))
    )
  }

  createTicket(newTicket: Omit<Ticket, 'id'|'position'|'status'|'createdDate'|'endDate'|'lastInteraction'|'history'|'isArchived'>): Observable<Ticket> {
    const url = 'assets/tickets.json';
    const now = new Date().toISOString();
    const ticketToCreate: Ticket = {
        ...newTicket,
        id: this.generateId(), // generate a unique id
        position: 0, //you need to fix this if you're using material table
        status: 'Aberto',
        createdDate: now,
        endDate: null,
        lastInteraction: now,
        history: [],
        isArchived: false
    }

    console.log("Creating ticket:", ticketToCreate); // Add this
    return this.http.get<Ticket[]>(url).pipe(
      switchMap(existingTickets => {
        console.log("Existing tickets:", existingTickets); // Add this
        const updatedTickets = [...existingTickets, ticketToCreate];
        console.log("Updated tickets:", updatedTickets); // Add this
        return this.http.put(url, updatedTickets);
      }),
      map(() => {
        return ticketToCreate; // Return the created ticket
      })
    );
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}

export interface Ticket {
  position: number;
  id: string;
  request: string;
  status: string;
  queue: string;
  createdDate: string; // ISO 8601 date string "yyyyMMddHHmmssff"
  endDate: string | null; // ISO 8601 date string "yyyyMMddHHmmssff"
  lastInteraction: string; // ISO 8601 date string "yyyyMMddHHmmssff"
  responsible?: string;
  requesterName: string;
  requesterCellphone?: string;
  requesterPhone?: string;
  locationName: string;
  locationRegion: string;
  locationComplement?: string;
  //communication: Communication[];
  history: History[];
  isArchived: boolean;
}
export interface History {
  date: string;
  description: string;
}
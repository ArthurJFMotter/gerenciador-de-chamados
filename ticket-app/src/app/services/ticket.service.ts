import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  http = inject(HttpClient);

  //PLACEHOLDER LOGIC
  getTickets(): Observable<Ticket[]> {
    return new Observable<Ticket[]>(observer => {
      const tickets: Ticket[] = JSON.parse(localStorage.getItem('tickets') || '[]');
      observer.next(tickets);
      observer.complete();
    });
  }
  
  //PLACEHOLDER FOR ACTUAL DB TO API CALLS
  getTicketById(id: string): Observable<Ticket | undefined> {
    return this.http.get<Ticket[]>(`assets/tickets.json`).pipe(
      map(tickets => tickets.find(ticket => ticket.id === id))
    )
  }

  //PLACEHOLDER LOGIC
  consultTicket(ticketId: string, ticketPassword: string): Observable<Ticket | null> {
    return new Observable<Ticket | null>(observer => {
      const tickets: Ticket[] = JSON.parse(localStorage.getItem('tickets') || '[]');
      const foundTicket = tickets.find(ticket => ticket.id === ticketId);
  
      if (foundTicket && ticketPassword === 'password') {
        observer.next(foundTicket);
      } else {
        observer.next(null); // Return null if not found or wrong password
      }
      
      observer.complete();
    });
  }
  
  //PLACEHOLDER LOGIC
  createTicket(newTicket: Omit<Ticket, 'id' | 'position' | 'status' | 'createdDate' | 'endDate' | 'lastInteraction' | 'history' | 'isArchived'>): Observable<Ticket> {
    const now = new Date().toISOString();
    const ticketToCreate: Ticket = {
      ...newTicket,
      id: this.generateId(),
      position: 0,
      status: 'Aberto',
      createdDate: now,
      endDate: null,
      lastInteraction: now,
      history: [],
      isArchived: false
    };

    let tickets: Ticket[] = JSON.parse(localStorage.getItem('tickets') || '[]');
    tickets.push(ticketToCreate);
    localStorage.setItem('tickets', JSON.stringify(tickets));

    return new Observable<Ticket>(observer => {
      observer.next(ticketToCreate);
      observer.complete();
    });
  }

  //PLACEHOLDER LOGIC
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
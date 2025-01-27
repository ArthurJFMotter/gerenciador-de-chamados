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
  id: string;
  request: string;
  status: string;
  queue: string;
  createdDate: string; //'DD/MM/YYYY'
  lastInteraction: string; //'HH:mm:ss'
  responsible?: string;
  requester: Requester;
  location: Location;
  communication: Communication[];
  repairs?: Repair[];
  equipment?: Equipment[];
  infrastructure?: Infrastructure[];
  history: History[];
}

export interface Requester {
  name: string;
  cellphone: string;
  phone: string;
}

export interface Location {
  name: string;
  region: string;
  complement?: string;
}

export interface Communication {
  date: string; // 'DD/MM/YYYY'
  message: string;
  time: string; // 'HH:mm:ss'
  userName: string;
}

export interface Repair {
  endDate: string; //'DD/MM/YYYY + HH:mm:ss'
  equipment: Equipment;
  date: string; // 'DD/MM/YYYY'
  description: string;
  startDate: string; //'DD/MM/YYYY + HH:mm:ss'
  status: string;
  workBench: string;
}

export interface Equipment {
  name: string;
  sealNumber?: string;
  serialNumber?: string;
  status: string;
  type: string;
}

export interface Infrastructure {
  measurementUnit: string;
  quantity: number;
  service: string;
  status: string;
}

export interface History {
  date: string; // 'DD/MM/YYYY + HH:mm:ss'
  event: string;
  user: string;
}
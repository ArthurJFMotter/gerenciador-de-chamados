import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
  export class TicketService {
      private apiUrl = 'api/tickets'; // Replace with your backend API endpoint
      http = inject(HttpClient);
  
      // Helper method to handle errors
      private handleError(error: HttpErrorResponse) {
          let errorMessage = 'An error occurred';
          if (error.error instanceof ErrorEvent) {
              // A client-side or network error occurred.
              errorMessage = `Error: ${error.error.message}`;
          } else {
              // The backend returned an unsuccessful response code.
              errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
          }
          console.error(errorMessage);
          return throwError(() => new Error(errorMessage));
      }
  
  
      getTickets(): Observable<Ticket[]> {
          return this.http.get<Ticket[]>(this.apiUrl)
              .pipe(
                  retry(2), // Retry a couple of times if there's a network issue
                  catchError(this.handleError)
              );
      }
  
      getTicket(id: number): Observable<Ticket> {
          const url = `${this.apiUrl}/${id}`;
          return this.http.get<Ticket>(url)
          .pipe(
              retry(2),
              catchError(this.handleError)
          );
      }
  
      createTicket(ticket: Partial<Ticket>): Observable<Ticket> { // 'Partial' allows only required fields for new tickets
          return this.http.post<Ticket>(this.apiUrl, ticket)
             .pipe(
                  catchError(this.handleError)
             );
      }
  
  
      updateTicket(ticket: Ticket): Observable<Ticket> {
          const url = `${this.apiUrl}/${ticket.id}`;
          return this.http.put<Ticket>(url, ticket)
              .pipe(
                  catchError(this.handleError)
              );
      }
  
       deleteTicket(id: number): Observable<void> {
          const url = `${this.apiUrl}/${id}`;
          return this.http.delete<void>(url)
          .pipe(
              catchError(this.handleError)
          );
      }
  }

export interface Ticket {
    id: string;
    request: string;
    status: string;
    queue: string;
    startDate: string; //'DD/MM/YYYY'
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
    locationName: string;
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
  
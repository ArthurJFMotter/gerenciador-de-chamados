import { Component, inject, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Ticket, TicketService } from '../../services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'; 

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, MatButtonModule], 
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent implements OnInit { 

  ticket$: Observable<Ticket | undefined> = of(undefined);
  ticket: Ticket | undefined; 

  route = inject(ActivatedRoute);
  router = inject(Router);
  ticketService = inject(TicketService);

  ngOnInit(): void {
    this.ticket$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.ticketService.getTicketById(id);
        } else {
          return of(undefined);
        }
      })
    );

    this.ticket$.subscribe(ticket => {
      this.ticket = ticket; 
    });
  }


  goToReport(): void {
    if (this.ticket && this.ticket.id) {
      this.router.navigate(['/report-builder', this.ticket.id]); // Navigate to report builder with ticket ID
    } else {
      console.warn('Ticket ID is not available.'); // Handle the case where ticket or ID is missing
      // Optionally display an error message to the user.
    }
  }
}
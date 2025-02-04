import { Component, inject } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Ticket, TicketService } from '../../services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {
  ticket$: Observable<Ticket | undefined> = of(undefined); // Use observable to handle async data, initialize as undefined
  ticket: Ticket | undefined;

  route = inject(ActivatedRoute);
  ticketService = inject(TicketService);

  ngOnInit(): void {
    this.ticket$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.ticketService.getTicketById(id); // Replace with your actual service method
        } else {
          return of(undefined);
        }
      })
    );

    this.ticket$.subscribe(ticket => {
      this.ticket = ticket; // Assign the ticket to your component's property
    });
  }
}

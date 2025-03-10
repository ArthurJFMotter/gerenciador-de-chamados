import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Ticket, TicketService } from '../../services/ticket.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports:
    [CommonModule,
      ReactiveFormsModule,
      MatSnackBarModule,
      MatFormFieldModule,
      MatError,
      MatInputModule,
      MatOptionModule,
      MatSelectModule,
      MatButtonModule],
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  router = inject(Router);
  fb = inject(FormBuilder);
  ticketService = inject(TicketService);
  snackBar = inject(MatSnackBar);

  ticketForm!: FormGroup;
  regions: string[] = ['CENTRO', 'LESTE', 'INTERNA', 'NORTE', 'OESTE', 'SUL'];
  queues: string[] = ['remote', 'on site', 'manteinance', 'network', 'telephony', 'warrant'];
  
  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      request: ['', Validators.required],
      requesterName: ['', Validators.required],
      requesterCellphone: [''],
      requesterPhone: [''],
      locationName: ['', Validators.required],
      locationRegion: ['', Validators.required],
      locationComplement: [''],
      queue: ['screening', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      const newTicket = this.ticketForm.value;
      console.log("Submitting ticket:", newTicket);

      this.ticketService.createTicket(newTicket).subscribe({
        next: (ticketCreated) => {
          console.log("Ticket created successfully:", ticketCreated);
          this.snackBar.open('Chamado criado com sucesso!', 'Fechar', { duration: 3000 });
          this.ticketForm.reset();
          this.goToConsult();
        },
        error: (error: any) => {
          console.error('Erro ao criar chamado:', error);
          this.snackBar.open('Erro ao criar chamado. Tente novamente.', 'Fechar', { duration: 5000 });
        }
      });

    } else {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });
    }
  }

  cancelSubmit() {
    this.snackBar.open('Chamado Cancelado!', 'Fechar', { duration: 3000 });
    this.ticketForm.reset();
    this.goToConsult();
  }

  goToConsult(){
    this.router.navigate(["/consult"]);
  }
}

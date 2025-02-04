import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, MatFormFieldModule, MatError, MatInputModule, MatOptionModule, MatSelectModule],
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit{
  fb = inject(FormBuilder);
  ticketService = inject(TicketService);

  ticketForm!: FormGroup;
  regioes: string[] = ['INTERNA', 'EXTERNA'];
  filas: string[] = ['remoto', 'presencial'];

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      request: ['', Validators.required],
      requesterName: ['', Validators.required],
      locationName: ['', Validators.required],
      locationRegion: ['', Validators.required],
      queue: ['', Validators.required]
    });
  }

  onSubmit(): void {
    /*
    if (this.ticketForm.valid) {
      const newTicket: Ticket = this.ticketForm.value;

      this.ticketService.createTicket(newTicket).subscribe({
        next: (ticketCreated) => {
          this.snackBar.open('Chamado criado com sucesso!', 'Fechar', { duration: 3000 });
          this.ticketForm.reset();
        },
        error: (error: any) => {
          console.error('Erro ao criar chamado:', error);
          this.snackBar.open('Erro ao criar chamado. Tente novamente.', 'Fechar', { duration: 5000 });
        }
      });
    } else {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });
    }
      */
  }
    
}

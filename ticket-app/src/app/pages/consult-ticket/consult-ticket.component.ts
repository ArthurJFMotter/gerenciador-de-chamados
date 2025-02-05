import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ticket, TicketService } from '../../services/ticket.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper'; // Import MatStepperModule

@Component({
  selector: 'app-consult-ticket',
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
      MatButtonModule,
      MatStepperModule,
      ],
  templateUrl: './consult-ticket.component.html',
  styleUrls: ['./consult-ticket.component.scss']
})
export class ConsultTicketComponent implements OnInit {
  router = inject(Router);
  fb = inject(FormBuilder);
  ticketService = inject(TicketService);
  snackBar = inject(MatSnackBar);

  consultForm!: FormGroup;
  ticketFound: Ticket | null = null;
  submitted: boolean = false;

  stepperLabels: string[] = ['Triagem', 'Separado', 'Em andamento', 'Finalizado'];
  currentStepIndex: number = 0;
  stepperOrientation: 'horizontal' | 'vertical' = 'horizontal';
  private readonly breakpoint: number = 768;

  ngOnInit(): void {
    this.consultForm = this.fb.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.consultForm.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });
      return;
    }

    this.submitted = true;

    const ticketId = this.consultForm.get('id')?.value;
    const ticketPassword = this.consultForm.get('password')?.value;

    this.ticketService.consultTicket(ticketId, ticketPassword).subscribe({
      next: (ticket: Ticket | null) => {
        this.ticketFound = ticket;
        if (ticket) { // Check if ticket is not null
          this.updateStepper(ticket);
        }
      },
      error: (error: any) => {
        console.error('Erro ao consultar ticket:', error);
        this.ticketFound = null;
        this.snackBar.open('Ticket não encontrado ou credenciais inválidas.', 'Fechar', { duration: 5000 });
      }
    });
  }

  goToCreate(){
    this.router.navigate(["/create"]);
  }

  updateStepper(ticket: Ticket) {
    if (ticket.isArchived) {
      this.currentStepIndex = 3;
    }
    else {
      switch (ticket.queue) {
        case 'screening':
          this.currentStepIndex = 0;
          break;
        case 'remote':
          this.currentStepIndex = 1;
          break;
        case 'on site':
          this.currentStepIndex = 2;
          break;
        default:
          this.currentStepIndex = 0;
          break;
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkStepperOrientation();
  }

  private checkStepperOrientation(): void {
    this.stepperOrientation = (window.innerWidth < this.breakpoint) ? 'vertical' : 'horizontal';
  }

}
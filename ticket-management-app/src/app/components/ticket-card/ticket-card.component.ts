import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Ticket {
  id: string;
  status: string;
  requester: string;
  request: string;
  location: string;
  region: string;
  date: string;
  time: string;
  responsible: string;
}

@Component({
  selector: 'app-ticket-card',
  imports: [CommonModule],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.css'
})
export class TicketCardComponent implements OnInit {
  tickets: Ticket[] = [
    {
      id: '00001',
      status: 'priority',
      requester: 'Isabela de Melo',
      request: 'Instalação de Programas',
      location: 'Secretaria de setor X',
      region: 'INTERNA',
      date: '01/01/2025',
      time: '1h 33m',
      responsible: 'Ciclano daqui',
    },
    {
      id: '00002',
      status: 'open',
      requester: 'Miguel dos Santos',
      request: 'Recuperação de Usuário',
      location: 'Central de tal lugar',
      region: 'CENTRO',
      date: '04/01/2025',
      time: '2d 5h',
      responsible: 'Fulana de cá',
    },
    {
      id: '00003',
      status: 'closed',
      requester: 'João da Silva',
      request: 'Instalação de impressora',
      location: 'Hospital daquele canto ali',
      region: 'NORTE',
      date: '28/12/2024',
      time: '4m',
      responsible: 'Fulano de lá',
    },
  ];

  ngOnInit(): void {
  }

}
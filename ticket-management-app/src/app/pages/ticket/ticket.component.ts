import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ticket',
  imports: [CommonModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export default class TicketComponent {

}

export interface Ticket {
  id: string;
  description: string;
  status: string;
  queue: string;
  startDate: string; //'DD/MM/YYYY'
  startTime: string; //'HH:mm:ss'
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

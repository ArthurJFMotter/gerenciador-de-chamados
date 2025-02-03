import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { Ticket } from '../../services/ticket.service';

@Component({
  selector: 'app-queue-tabs',
  standalone: true,
  imports: [ CommonModule, MatTabsModule, MatIconModule ],
  templateUrl: './queue-tabs.component.html',
  styleUrl: './queue-tabs.component.scss'
})
export class QueueTabsComponent implements OnChanges {
  @Input() queues: string[] = [];
  @Input() queueConfig: { [key: string]: { name: string; icon: string } } = {};
  @Input() allTickets: Ticket[] = [];
  @Input() selectedQueue: string = '';
  @Input() selectedTab: string = '';
  @Output() queueChange = new EventEmitter<string>();

  selectedQueueIndex: number = 0;
  queueTicketCounts: { [key: string]: number } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allTickets'] || changes['queues'] || changes['queueConfig'] || changes['selectedTab']) {
      this.calculateQueueTicketCounts();
      this.selectedQueueIndex = this.queues.indexOf(this.selectedQueue);
    }
  }

  calculateQueueTicketCounts() {
    if (!this.allTickets || !this.queues) {
      return;
    }

    this.queues.forEach(queue => {
      let filteredTickets = this.allTickets;
      if (this.selectedTab === 'tickets') {
        filteredTickets = this.allTickets.filter(ticket => !ticket.isArchived);
      }
      if (this.selectedTab === 'archived') {
        filteredTickets = this.allTickets.filter(ticket => ticket.isArchived);
      }

      this.queueTicketCounts[queue] = filteredTickets.filter(ticket => ticket.queue === queue).length;
    });

    let filteredTickets = this.allTickets;
    if (this.selectedTab === 'screening') {
      filteredTickets = this.allTickets.filter(ticket => ticket.queue == "screening");
    }
    if (this.selectedTab === 'tickets') {
      filteredTickets = this.allTickets.filter(ticket => !ticket.isArchived && ticket.queue != "screening");
    }
    if (this.selectedTab === 'archived') {
      filteredTickets = this.allTickets.filter(ticket => ticket.isArchived);
    }
    this.queueTicketCounts[''] = filteredTickets.length;
  }

  onQueueChange(event: MatTabChangeEvent) {
    this.selectedQueueIndex = event.index;
    this.selectedQueue = this.queues[event.index];
    this.queueChange.emit(this.selectedQueue);
    /*debug*/ //console.log('Queue changed to:', this.selectedQueue);
  }
}
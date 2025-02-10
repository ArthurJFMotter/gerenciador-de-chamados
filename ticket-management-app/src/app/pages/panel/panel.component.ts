import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket, TicketService } from '../../services/ticket.service';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ViewTicketsComponent } from '../../components/view-tickets/view-tickets.component';
import { ViewArchivedComponent } from '../../components/view-archived/view-archived.component';
import { ViewScreeningComponent } from '../../components/view-screening/view-screening.component';
import { QueueTabsComponent } from '../../components/queue-tabs/queue-tabs.component';

@Component({
    selector: 'app-panel',
    standalone: true,
    imports: [
        CommonModule,
        MatTabsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatCardModule,
        ViewTicketsComponent,
        ViewArchivedComponent,
        ViewScreeningComponent,
        QueueTabsComponent
    ],
    templateUrl: './panel.component.html',
    styleUrl: './panel.component.scss'
})
export class PanelComponent implements OnInit {
    ticketService = inject(TicketService);

    loading: boolean = true;
    showTable: string = 'table';
    selectedTab: string = 'tickets';
    selectedTabIndex: number = 0;
    selectedQueue: string = 'remote';
    allTickets: Ticket[] = [];
    error: string | null = null;

    readonly tabs: string[] = ['screening', 'tickets', 'archived'];
    readonly queues: string[] = ['remote', 'on site', 'maintenance', 'warehouse', 'network', 'telephony', 'warrant', ''];

    tabConfig: { [key: string]: { name: string; icon: string } } = {
        'screening': { name: 'Triagem', icon: 'filter_alt' },
        'tickets': { name: 'Chamados', icon: 'local_activity' },
        'archived': { name: 'Arquivado', icon: 'archive' },
    };

    queueConfig: { [key: string]: { name: string; icon: string } } = {
        'remote': { name: 'Remoto', icon: 'headset_mic' },
        'on site': { name: 'Presencial', icon: 'directions_run' },
        'maintenance': { name: 'Manutenção', icon: 'build' },
        'warehouse': { name: 'Almoxarifado', icon: 'store' },
        'network': { name: 'Redes', icon: 'router' },
        'telephony': { name: 'Telefonia', icon: 'phone' },
        'warrant': { name: 'Garantia', icon: 'receipt' },
        '': { name: 'Todos', icon: 'reorder' },
    };

    ngOnInit(): void {
        this.selectedTabIndex = this.tabs.indexOf(this.selectedTab);
        this.loadTickets();
    }

    loadTickets() {
        this.loading = true;
        this.ticketService.getTickets()
            .subscribe(tickets => {
                this.allTickets = tickets;
                /*debug*///console.log('allTickets:', this.allTickets);
                this.loading = false;
            });
    }

    onTabChange(event: MatTabChangeEvent) {
        this.selectedTabIndex = event.index;
        this.selectedTab = this.tabs[event.index];
        /*debug*///console.log('Tab changed to:', this.selectedTab);
    }

    onQueueChange(selectedQueue: string) {
        this.selectedQueue = selectedQueue;
        /*debug*///console.log('Queue changed to:', this.selectedQueue);
    }

    handleSearchChange(searchTerm: string) {
        console.log('search term in panel', searchTerm)
    }
    
    handleShowTableChange(showTable: string) {
        this.showTable = showTable;
    }
}
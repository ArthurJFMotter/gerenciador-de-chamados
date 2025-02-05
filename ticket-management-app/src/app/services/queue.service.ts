import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  private queues: Queue[] = [ // PLACEHOLDERS
    { id: '0001', name: 'Triage', description: 'screening queue' },
    { id: '0002', name: 'Remote', description: 'external-related issues' },
    { id: '0003', name: 'On site', description: 'General support queue' },
    { id: '0004', name: 'Manteinance', description: 'hardware-related issues' },
    { id: '0005', name: 'Warehouse', description: 'Warehouse-related issues' },
    { id: '0006', name: 'Network', description: 'Network-related issues' },
    { id: '0007', name: 'Telephony', description: 'Telephony-related issues' },
    { id: '0008', name: 'warrant', description: 'warrant-related issues' },
    { id: '0009', name: 'all', description: 'all issues' },
  ];

  // In a real application, this would be an HTTP GET request to fetch queues
  getQueues(): Observable<Queue[]> {
    return of(this.queues);
  }

  //PLACEHOLDER
  getQueue(id: string): Observable<Queue | undefined> {
      return of(this.queues.find(q => q.id === id));
  }

  // In a real application, this would be an HTTP POST request to create a new queue
  createQueue(queue: Queue): Observable<Queue> {
    queue.id = this.generateId();
    this.queues.push(queue);
    return of(queue);
  }

  // In a real application, this would be an HTTP PUT or PATCH request to update an existing queue
  updateQueue(queue: Queue): Observable<Queue> {
    const index = this.queues.findIndex(q => q.id === queue.id);
    if (index > -1) {
      this.queues[index] = queue;
      return of(queue);
    } else {
      throw new Error(`Queue with ID ${queue.id} not found.`);
    }
  }

  // In a real application, this would be an HTTP DELETE request to delete a queue
  deleteQueue(id: string): Observable<string> {
    this.queues = this.queues.filter(q => q.id !== id);
    return of(id);  
  }

  //PLACEHOLDER
  private generateId(): string {
    return 'queue-' + Math.random().toString(36).substring(2, 15);
  }
}

export interface Queue {
    id: string;
    name: string;
    description?: string;
  }
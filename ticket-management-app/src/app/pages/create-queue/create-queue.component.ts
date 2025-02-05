import { Component, inject, OnInit } from '@angular/core';
import { QueueService, Queue } from '../../services/queue.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-create-queue',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatError,
    MatListModule,
    MatExpansionModule,
  ],
  templateUrl: './create-queue.component.html',
  styleUrls: ['./create-queue.component.scss']
})
export class CreateQueueComponent implements OnInit {
  fb = inject(FormBuilder);
  queueService = inject(QueueService);

  queueForm!: FormGroup;
  queues: Queue[] = [];

  ngOnInit(): void {
    this.queueForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.loadQueues();
  }

  loadQueues(): void {
    this.queueService.getQueues().subscribe(queues => {
      this.queues = queues;
    });
  }

  onSubmit(): void {
    if (this.queueForm.valid) {
      const newQueue: Queue = {
        id: '',
        name: this.queueForm.value.name,
        description: this.queueForm.value.description
      };

      this.queueService.createQueue(newQueue).subscribe(createdQueue => {
        console.log('Queue created:', createdQueue);
        this.queueForm.reset();
        this.loadQueues();
      });
    }
  }

  deleteQueue(id: string): void {
    this.queueService.deleteQueue(id).subscribe(() => {
      console.log(`Queue with ID ${id} deleted`);
      this.loadQueues();
    });
  }
}

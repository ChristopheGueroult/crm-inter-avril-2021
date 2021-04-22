import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateOrder } from 'src/app/core/enums/state-order.enum';
import { Order } from 'src/app/core/models/order';

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.scss'],
})
export class FormOrderComponent implements OnInit {
  @Input() init!: Order;
  @Output() submited: EventEmitter<any> = new EventEmitter<any>();
  public states = Object.values(StateOrder);
  public form!: FormGroup;
  // doit etre un event
  // doit etre un observable
  // doit pas etre initialisé
  // doit etre un  observable chaud
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tjmHt: [this.init.tjmHt],
      nbJours: [this.init.nbJours],
      tva: [this.init.tva],
      state: [this.init.state],
      typePresta: [this.init.typePresta],
      client: [this.init.client],
      comment: [this.init.comment],
      id: [this.init.id],
    });
  }
  public onSubmit(): void {
    this.submited.emit(this.form.value);
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../services/person.service';
import { CommonModule, NgFor } from '@angular/common'; // ✅ Correct CommonModule and NgFor import
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // ✅ Add ReactiveFormsModule

@Component({
  selector: 'app-address-form',
  standalone: true, // ✅ Ensure it's a standalone component
  imports: [CommonModule, NgFor, ReactiveFormsModule], // ✅ Use ReactiveFormsModule
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent {
  addressForm: FormGroup;

  // Sample data for dropdowns
  cities: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  states: string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado'];

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      fullName: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // ✅ Add pattern validation for phone number
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]] // ✅ Add pattern validation for ZIP code
    });
  }

  @Input() person: Person | null = null;  // Input the current person data
  @Output() formSubmitted = new EventEmitter<Person>();  // Emit the current person object

  // Add any necessary form logic here
  onSubmit(): void {
      const formData: Person = this.addressForm.value; // Get form values
      this.formSubmitted.emit(formData); // Emit the filled object
  }

  resetForm() {
    this.addressForm.reset();
  }
}

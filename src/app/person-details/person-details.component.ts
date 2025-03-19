import { Component, OnInit } from '@angular/core';
import { PersonService, Person } from '../services/person.service';
import { AddressFormComponent } from '../address-form/address-form.component';
import { CommonModule } from '@angular/common';
import { NgIf, NgFor } from '@angular/common';  // Importing CommonModule utilities

@Component({
  selector: 'app-person-details',
  standalone: true,
  imports: [NgFor, NgIf, AddressFormComponent],
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {
  persons: Person[] = [];
  showForm = false;  // Flag to toggle form display
  currentPerson: Person | null = null;  // Store the current person being edited

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.loadPersons();
    console.log(this.persons);
  }

  loadPersons(): void {
    this.personService.getPersons().subscribe((data) => {
      this.persons = data;
      console.log(data);
    });
  }

  // Toggle the form display for adding a new person or editing an existing person
  addPerson(): void {
    this.showForm = !this.showForm; // Toggle form visibility
    this.currentPerson = null;  // Clear the current person when adding a new one
  }

  // Open the form with the selected person's data for editing
  editPerson(person: Person): void {
    this.showForm = true;  // Show the form for editing
    this.currentPerson = { ...person };  // Set the person data for editing
  }

  // Delete the selected person
  deletePerson(person: Person): void {
    if (confirm('Are you sure you want to delete this Address?')) {
      this.personService.deletePerson(person.id!).subscribe(() => {
        // Remove the deleted person from the list
        this.persons = this.persons.filter(p => p.id !== person.id);
      });
    }
  }

  onFormSubmit(person: Person): void {
    if (this.currentPerson) {
      // Ensure ID is assigned when updating
      const updatedPerson = { ...person, id: this.currentPerson.id };
  
      this.personService.updatePerson(updatedPerson).subscribe((response) => {
        const index = this.persons.findIndex(p => p.id === response.id);
        
        if (index !== -1) {
          this.persons[index] = response; // ✅ Ensure change detection works
          this.persons = [...this.persons]; // ✅ Force Angular to detect change
        }
  
        this.showForm = false;  // Hide form
        this.currentPerson = null;  // Clear editing state
      });
    } else {
      // Adding a new person
      this.personService.addPerson(person).subscribe((newPerson) => {
        this.persons.push(newPerson);
        this.showForm = false;
      });
    }
  }

}

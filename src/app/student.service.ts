import { Injectable } from '@angular/core';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
  photoUrl?: string;
  status?: 'present' | 'absent';
}

@Injectable({
  providedIn: 'root'
})

  export class StudentService {
  mockStudents: Student[] = [
    {id: '1', firstName: 'Jean', lastName: 'Bon', status: 'present'},
    {id: '2', firstName: 'Pierre', lastName: 'Afeu'},
    {id: '3', firstName: 'Harry', lastName: 'Covert',status: 'absent'},
    {id: '4', firstName: 'Corinne', lastName: 'Tigoute'},
    {id: '5', firstName: 'Mélisine', lastName: 'Enfaillite'}
  ]

  constructor() { }
  getAll(){
    return this.mockStudents;
  }
  
}




import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Student, StudentService} from "../student.service";

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.page.html',
  styleUrls: ['./student-info.page.scss'],
})

export class StudentInfoPage implements OnInit {

  students: Student[] = [];
  student: Student;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
    ) {
    this.students = this.studentService.getAll();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.student = this.students.find(student => student.id === id);
    if(!this.student){
      this.router.navigateByUrl('/roster');
    }
  }
}

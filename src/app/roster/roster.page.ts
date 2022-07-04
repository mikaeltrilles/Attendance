import { Component, OnInit } from '@angular/core';
import {Student, StudentService} from "../student.service";
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.page.html',
  styleUrls: ['./roster.page.scss'],
})

export class RosterPage implements OnInit {
  students:Student[] = [];
  constructor(
    private studentService : StudentService,
    private actionSheetController: ActionSheetController,
  ) { }


  ngOnInit() {
    this.students = this.studentService.getAll();
  }

  async presentActionSheet(student: Student) {
    const actionSheet = await this.actionSheetController.create({
      header: `${student.firstName} ${student.lastName}`,
      buttons: [{
        text: 'Présent',
        icon: 'eye',
        handler: () => {
          student.status = 'present';
        }
      },{
        text: 'Absent',
        icon: 'eye-off-outline',
        handler: () => {
          student.status= 'absent';
        }
      },{
        text: 'Supprimer',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Supprimer');
        }
      },   {
        text: 'Annuler',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Annuler');
        }
      }]
    });
    await actionSheet.present();
  }
}

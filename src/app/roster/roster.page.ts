import { Component, OnInit } from '@angular/core';
import {Student, StudentService} from "../student.service";
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

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
    private alertController: AlertController,
    private toastController: ToastController
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
        // role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.presentDeleteAlert(student);
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

  async presentDeleteAlert(student: Student) {
    const alert = await this.alertController.create({
      header: 'Êtes-vous sûr de vouloir supprimer ?',
      subHeader: `${student.firstName} ${student.lastName}`,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: 'Supprimer',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.deleteStudent(student);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteStudent(student: Student) {
    this.students = this.students.filter(s => s.id !== student.id);
    const toast = await this.toastController.create({
      message: `L'étudiant ${student.firstName} ${student.lastName} a bien été supprimé.`,
      duration: 2000,
      position: 'middle',
    });
    await toast.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.scss']
})
export class HighScoresComponent implements OnInit {

  highScores = [];

  constructor(public afAuth: AngularFireAuth, public router: Router, public databaseService: DatabaseService) { }

  ngOnInit() {
    this.selectScores();
  }

  async selectScores() {
    this.highScores = await this.databaseService.selectHighScores();
  }

  goBack() {
    this.router.navigateByUrl('/content');
  }

}

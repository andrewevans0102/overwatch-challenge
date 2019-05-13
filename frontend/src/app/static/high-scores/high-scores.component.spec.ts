import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HighScoresComponent } from './high-scores.component';
import { MaterialModule } from '../../material/material.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';

describe('HighScoresComponent', () => {
  let component: HighScoresComponent;
  let fixture: ComponentFixture<HighScoresComponent>;

  // stub for instance of the AngularFirestore class
  const firestoreStub = {
    collection: (name: string) => ({
      valueChanges: () => new BehaviorSubject( [] ),
      doc: (id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
        set: (d: any) => new Promise((resolve, reject) => resolve()),
      }),
    }),
  };

  // stub for the instance of the AngularFireAuth class
  const fireAuthStub = {
    auth: jasmine.createSpyObj('auth', {
      onAuthStateChanged: of('1234')
    }),
    authState: of('1234')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HighScoresComponent
      ],
      imports: [
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AngularFirestore, useValue: firestoreStub },
        { provide: AngularFireAuth, useValue: fireAuthStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

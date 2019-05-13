import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateActivityComponent } from './create-activity.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateActivityComponent', () => {
  let component: CreateActivityComponent;
  let fixture: ComponentFixture<CreateActivityComponent>;

  // stub for instance of the AngularFirestore class
  const firestoreStub = {
    collection: (name: string) => ({
      ref: {
        doc: (id: string) => ({
          get: () => new Promise((resolve, reject) => resolve())
        })
      },
      doc: (id: string) => ({
        get: () => new Promise((resolve, reject) => resolve()),
        set: (value: any) => new Promise((resolve, reject) => resolve())
      }),
      createId: () => '1234'
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
        CreateActivityComponent
      ],
      imports: [
        AngularFirestoreModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(CreateActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

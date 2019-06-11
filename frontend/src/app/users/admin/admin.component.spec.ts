import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../../material/material.module';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { PopupService } from 'src/app/services/popup.service';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  // stub response from AngularFiresoreModule GET call
  const querySnapshot = {
    forEach: () => null
  };

  // stub for instance of the AngularFirestore class
  const firestoreStub = {
    collection: (name: string) => ({
      ref: {
        get: () => new Promise((resolve, reject) => resolve(querySnapshot))
      },
      doc: (id: string) => ({
        set: (d: any) => new Promise((resolve, reject) => resolve())
      })
    }),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminComponent
      ],
      imports: [
        MaterialModule,
        AngularFirestoreModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AngularFirestore, useValue: firestoreStub },
        PopupService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentComponent } from './content.component';
import { MaterialModule } from '../../material/material.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Activity } from 'src/app/models/activity/activity';
import { Store } from '@ngrx/store';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  let store: MockStore<{
    viewActivity: {
      activity: Activity[],
      error: null
    }
   }>;
  const initialState = {
    viewActivity: {
      activity: [],
      error: null
    }
  };

  // stub response from AngularFiresoreModule GET call
  const querySnapshot = {
    forEach: () => null
  };

  // stub for instance of the AngularFirestore class
  const firestoreStub = {
    collection: (name: string) => ({
      ref: {
        get: () => new Promise((resolve, reject) => resolve(querySnapshot)),
        doc: (id: string) => ({
          get: () => new Promise((resolve, reject) => resolve()),
          set: (value: any) => new Promise((resolve, reject) => resolve())
        })
      }
    }),
  };

  // stub for the instance of the AngularFireAuth class
  const fireAuthStub = {
    auth: jasmine.createSpyObj('auth', {
      onAuthStateChanged: of('1234')
    }),
    authState: of('1234'),
    signout: () => new Promise((resolve, reject) => resolve())
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContentComponent
      ],
      imports: [
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AngularFirestore, useValue: firestoreStub },
        { provide: AngularFireAuth, useValue: fireAuthStub },
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

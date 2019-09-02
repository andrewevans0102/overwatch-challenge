import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActivityComponent } from './view-activity.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material/material.module';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Activity } from 'src/app/models/activity/activity';
import { Store } from '@ngrx/store';

describe('ViewActivityComponent', () => {
  let component: ViewActivityComponent;
  let fixture: ComponentFixture<ViewActivityComponent>;
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
        ViewActivityComponent
      ],
      imports: [
        RouterTestingModule,
        MaterialModule
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
    fixture = TestBed.createComponent(ViewActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

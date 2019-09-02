import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';

describe('DatabaseService', () => {

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

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async () => TestBed.configureTestingModule({
    imports: [
      AngularFirestoreModule,
    ],
    providers: [
      { provide: AngularFirestore, useValue: firestoreStub },
    ]
  }));

  it('should be created', () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
    expect(service).toBeTruthy();
  });
});

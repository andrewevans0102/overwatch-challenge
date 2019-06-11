import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupModalComponent } from './popup-modal.component';
import { MaterialModule } from '../../material/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupModalData } from '../../models/popup-modal-data/popup-modal-data';

describe('PopupModalComponent', () => {
  let component: PopupModalComponent;
  let fixture: ComponentFixture<PopupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupModalComponent ],
      imports: [ MaterialModule ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: new PopupModalData() } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GlobalPage } from './global.page';

describe('GlobalPage', () => {
  let component: GlobalPage;
  let fixture: ComponentFixture<GlobalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

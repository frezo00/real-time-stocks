import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SwitchComponent } from './components';

@NgModule({
  imports: [SwitchComponent],
  exports: [FormsModule, ReactiveFormsModule, SwitchComponent],
})
export class FormControlsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    CardModule,
    DialogModule,
    TooltipModule,
    TableModule,
    DropdownModule,
    FloatLabelModule,
    CalendarModule,
    ConfirmDialogModule,
    ToolbarModule,
    InputNumberModule,
    TagModule

  ]
})
export class SharedModule { }

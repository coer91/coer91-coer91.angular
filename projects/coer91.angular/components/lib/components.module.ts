import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components 
import { CoerTextBox } from './coer-textbox/coer-textbox.component';

@NgModule({
    imports: [
        CommonModule, 
        RouterModule,
        FormsModule,
        ReactiveFormsModule, 
    ],
    declarations: [ 
        CoerTextBox
    ],
    exports: [ 
        CoerTextBox
    ]
})
export class ComponentsModule { }
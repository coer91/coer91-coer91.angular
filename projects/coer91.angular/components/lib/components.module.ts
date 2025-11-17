import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components 
import { CoerAccordion } from './coer-accordion/coer-accordion.component';
import { CoerTextBox } from './coer-textbox/coer-textbox.component';

@NgModule({
    imports: [
        CommonModule, 
        RouterModule,
        FormsModule,
        ReactiveFormsModule, 
    ],
    declarations: [ 
        CoerAccordion,
        CoerTextBox
    ],
    exports: [ 
        CoerAccordion,
        CoerTextBox
    ]
})
export class ComponentsModule { }
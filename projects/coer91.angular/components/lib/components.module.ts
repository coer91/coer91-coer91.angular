import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components 
import { CoerAccordion } from './coer-accordion/coer-accordion.component';
import { CoerButton } from './coer-button/coer-button.component';
import { CoerSelectBox } from './coer-selectbox/coer-selectbox.component';
import { CoerSidenav   } from './coer-sidenav/coer-sidenav.component';
import { CoerTextBox   } from './coer-textbox/coer-textbox.component';
import { CoerToolbar   } from './coer-toolbar/coer-toolbar.component';

@NgModule({
    imports: [
        CommonModule, 
        RouterModule,
        FormsModule,
        ReactiveFormsModule, 
    ],
    declarations: [ 
        CoerAccordion,
        CoerButton,
        CoerSelectBox,
        CoerSidenav,
        CoerTextBox,
        CoerToolbar
    ],
    exports: [ 
        CoerAccordion,
        CoerButton,
        CoerSelectBox,
        CoerSidenav,
        CoerTextBox,
        CoerToolbar
    ]
})
export class ComponentsModule { }
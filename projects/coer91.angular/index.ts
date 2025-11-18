import { NgModule } from '@angular/core';   
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'coer91.tools/extensions';
 
//Components   
import * as components from '@library/components';

@NgModule({  
    imports: [  
        CommonModule,
        RouterModule, 
        RouterOutlet,
        FormsModule,
        ReactiveFormsModule,
        components.ComponentsModule,
    ],
    exports: [ 
        CommonModule,
        RouterModule, 
        RouterOutlet,
        FormsModule,
        ReactiveFormsModule,
        components.CoerAccordion,
        components.CoerSelectBox,
        components.CoerTextBox,
    ]
})
export class coer91Module { } 
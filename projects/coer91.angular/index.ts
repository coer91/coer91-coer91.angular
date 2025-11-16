import { NgModule } from '@angular/core';   
 
//Components   
import * as components from '@library/components';

@NgModule({  
    imports: [  
        components.ComponentsModule,
    ],
    exports: [ 
        components.CoerTextBox,
    ]
})
export class coer91Module { } 
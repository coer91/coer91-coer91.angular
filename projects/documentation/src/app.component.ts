import { Tools } from 'coer91.tools';
import { RootModule } from './root/root.module'; 
import { Component, viewChild } from '@angular/core'; 
import { CoerAccordion, CoerButton, CoerSelectBox, CoerTextBox } from '@library/components';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RootModule],
    templateUrl: './app.component.html'
})
export class AppComponent {  
      
    //Elements
    protected readonly ddddddd = viewChild.required<CoerAccordion>('ddddddd'); 
    protected readonly dddsdddd = viewChild.required<CoerTextBox>('dddsdddd'); 
    protected readonly btt = viewChild.required<CoerButton>('btt'); 
    protected readonly sele = viewChild.required<CoerSelectBox<any>>('sele'); 
    protected test2 = true;
    protected test3 = '';
    protected test4 = null


    Log(event: any, value?: any) {
        console.log({ event, value })
    }


    constructor() {
         setTimeout(() => {
            this.btt().Focus();
         }, 3000)
    }
}
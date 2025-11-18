import { Tools } from 'coer91.tools';
import { RootModule } from './root/root.module'; 
import { Component, viewChild } from '@angular/core'; 
import { CoerAccordion, CoerTextBox } from '@library/components';

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
    protected test2 = true;
    protected test3 = '';
    protected test4 = { id: 1,  name: 'Holfffffffffffeeeeeeeeeee' };


    Log(event: any, value?: any) {
        console.log({ event, value })
    }


    constructor() {
        Tools.Sleep(3000).then(() => {
            //this.test2 = false 

            Tools.Sleep(3000).then(() => {
                //this.test2 = true 

                this.dddsdddd().Focus()
            })
        })


         
    }
}
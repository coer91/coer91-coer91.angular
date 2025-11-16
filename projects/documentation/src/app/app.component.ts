import { Tools } from 'coer91.tools';
import { RootModule } from './root/root.module'; 
import { Component, viewChild } from '@angular/core'; 
import { CoerTextBox } from '@library/components';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RootModule],
    templateUrl: './app.component.html'
})
export class AppComponent {  
      
    //Elements
    protected readonly ddddddd = viewChild.required<CoerTextBox>('ddddddd');
    protected test = '';
    protected test2 = '';
    protected test3 = '';
    protected test4 = '';


    Log(event: string, value: any) {
        //console.log({ event, value })
    }


    constructor() {
        Tools.Sleep().then(() => {
           
        })
    }
}
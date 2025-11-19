import { Component, AfterViewInit, OnDestroy, signal } from '@angular/core';
import {  Tools }from 'coer91.tools';

@Component({
    selector: 'coer-sidenav',
    templateUrl: './coer-sidenav.component.html', 
    styleUrl: './coer-sidenav.component.scss', 
    standalone: false
})
export class CoerSidenav implements AfterViewInit, OnDestroy {       

    //Variables
    protected readonly _id = Tools.GetGuid("coer-sidenav"); 
    protected readonly _isOpen = signal<boolean>(true); 
     
    //output 

    //input 

    constructor() {
        
    }

    //AfterViewInit
    async ngAfterViewInit() { 
    }


    //OnDestroy
    ngOnDestroy() {
        
    }  

 
}
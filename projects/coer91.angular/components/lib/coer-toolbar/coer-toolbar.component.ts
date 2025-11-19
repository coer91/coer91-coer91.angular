import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import {  Tools }from 'coer91.tools';

@Component({
    selector: 'coer-toolbar',
    templateUrl: './coer-toolbar.component.html', 
    styleUrl: './coer-toolbar.component.scss', 
    standalone: false
})
export class CoerToolbar implements AfterViewInit, OnDestroy {       

    //Variables
    protected readonly _id = Tools.GetGuid("coer-toolbar"); 
     
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
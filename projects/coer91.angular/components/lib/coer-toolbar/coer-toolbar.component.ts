import { Component, AfterViewInit, OnDestroy, output } from '@angular/core';
import {  Tools }from 'coer91.tools';
import { IAppSettings } from 'coer91.tools/interfaces';
declare const appSettings: IAppSettings;

@Component({
    selector: 'coer-toolbar',
    templateUrl: './coer-toolbar.component.html', 
    styleUrl: './coer-toolbar.component.scss', 
    standalone: false
})
export class CoerToolbar implements AfterViewInit, OnDestroy {       

    //Variables
    protected readonly _id = Tools.GetGuid("coer-toolbar"); 
    protected readonly _appSettings = appSettings;
     
    //output 
    public onClickToogle = output<void>();

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
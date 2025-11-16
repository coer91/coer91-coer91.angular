//Modules
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { coer91Module } from '@library'; 

//Components 
 

@NgModule({
    declarations: [ 
    ],
    imports: [
        RouterOutlet,
        RouterModule, 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        coer91Module 
    ],
    exports: [
        RouterModule, 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        coer91Module 
    ]
})
export class SharedModule { }
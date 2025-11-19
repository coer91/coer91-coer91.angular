import { Component, input, AfterViewInit, output, OnDestroy, computed } from '@angular/core';
import {  HTMLElements, Tools }from 'coer91.tools';

@Component({
    selector: 'coer-button',
    templateUrl: './coer-button.component.html', 
    styleUrl: './coer-button.component.scss', 
    standalone: false
})
export class CoerButton implements AfterViewInit, OnDestroy {       

    //Variables
    protected readonly _id = Tools.GetGuid("coer-button");     
    protected readonly IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    protected _htmlElement!: HTMLElement; 

    //output
    public onClick   = output<void>(); 
    public onReady   = output<void>();
    public onDestroy = output<void>();

    //input
    public label            = input<string>(''); 
    public type             = input<'filled' | 'outline' | 'icon' | 'icon-filled' | 'icon-outline'>('filled');
    public color            = input<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light'>('primary');
    public width            = input<string>('100px');
    public minWidth         = input<string>('35px');
    public maxWidth         = input<string>('100px'); 
    public height           = input<string>('35px');
    public minHeight        = input<string>('35px');
    public maxHeight        = input<string>('35px'); 
    public marginTop        = input<string>('0px');
    public marginRight      = input<string>('0px');
    public marginBottom     = input<string>('0px');
    public marginLeft       = input<string>('0px'); 


    constructor() {
         
    }

    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep(); 
        this._htmlElement = HTMLElements.GetElementById(this._id)!;
    }


    //OnDestroy
    ngOnDestroy() {
        
    }  

    //computed
    protected _label = computed(() => {
        if(['filled', 'outline'].includes(this.type())) {
            return Tools.IsOnlyWhiteSpace(this.label()) ? 'Click' : this.label()
        }

        return this.label();
    });

    //computed
    protected _width = computed(() => {
        return this.width();
    });

    //computed
    protected _minWidth = computed(() => {
        return this.minWidth();
    });

    //computed
    protected _maxWidth = computed(() => {
        return this.maxWidth();
    });

    //computed
    protected _height = computed(() => {
        return this.height();
    });

    //computed
    protected _minHeight = computed(() => {
        return this.minHeight();
    });

    //computed
    protected _maxHeight = computed(() => {
        return this.maxHeight();
    });
    
    //computed
    protected _borderRadius = computed(() => {
        return '5px';
    });

    //computed
    protected _backgroundColor = computed<string>(() => {
        return `background-color-${this.color()}`;
    });

    //computed
    protected _color = computed<string>(() => {
        return ['warning', 'light'].includes(this.color())
            ? 'color-dark' : 'color-light' 
    });

    //computed
    protected _cursor = computed<string>(() => {
        return 'pointer';
    });

    /** */
    public ScrollToElement(): void {
        HTMLElements.ScrollToElement(this._htmlElement); 
    }
}
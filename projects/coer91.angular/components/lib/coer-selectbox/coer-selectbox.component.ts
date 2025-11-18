import { Component, input, AfterViewInit, output, OnDestroy, computed, signal } from '@angular/core';
import { CONTROL_VALUE, ControlValue } from '@library/tools';
import { Collections, HTMLElements, Tools } from 'coer91.tools';

@Component({
    selector: 'coer-selectbox',
    templateUrl: './coer-selectbox.component.html', 
    styleUrl: './coer-selectbox.component.scss',
    providers: [CONTROL_VALUE(CoerSelectBox)],
    standalone: false
})
export class CoerSelectBox<T> extends ControlValue implements AfterViewInit, OnDestroy {
    
    protected override _value: T | null = null;

    //Variables
    protected readonly _id = Tools.GetGuid("coer-selectbox");
    protected readonly _isCollapsed = signal<boolean>(true); 
    protected _htmlElementContainer!: HTMLInputElement; 
    protected _htmlElement!: HTMLInputElement; 
    protected _isHoverElement: boolean = false;
    protected _isFocused: boolean = false;
    protected _isLoading: boolean = false; 

    //output
    public onInput      = output<string | number>();
    public onKeyupEnter = output<string | number>();
    public onClear      = output<void>(); 
    public onReady      = output<void>();
    public onDestroy    = output<void>();

    //input
    public label            = input<string>('');
    public placeholder      = input<string>('');
    public displayProperty  = input<string>('name');
    public isLoading        = input<boolean>(false); 
    public isReadonly       = input<boolean>(false);
    public isInvisible      = input<boolean>(false);
    public isHidden         = input<boolean>(false);   
    public textPosition     = input<'left' | 'center' | 'right'>('left');  
    public minLength        = input<number | string>(0);
    public maxLength        = input<number | string>(50);
    public showClearButton  = input<boolean>(false);
    public isInvalid        = input<boolean>(false);
    public isValid          = input<boolean>(false); 
    public width            = input<string>('');
    public minWidth         = input<string>('100px');
    public maxWidth         = input<string>('100%'); 
    public marginTop        = input<string>('0px');
    public marginRight      = input<string>('0px');
    public marginBottom     = input<string>('0px');
    public marginLeft       = input<string>('0px');

    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep();
        this._htmlElementContainer = HTMLElements.GetElementById(`${this._id}-container`) as HTMLInputElement;
        this._htmlElementContainer.addEventListener('mouseenter', this._onMouseEnter);
        this._htmlElementContainer.addEventListener('mouseleave', this._onMouseLeave);

        this._htmlElement = HTMLElements.GetElementById(this._id) as HTMLInputElement;
        this._htmlElement.addEventListener('input', this._onInput);
        this._htmlElement.addEventListener('keyup', this._onKeyup);
        this._htmlElement.addEventListener('paste', this._onPaste);
        this._htmlElement.addEventListener('focus', this._onFocus);
        this._htmlElement.addEventListener('blur', this._onBlur);

        this.onReady.emit();
    }


    //OnDestroy
    ngOnDestroy() {
        this._htmlElement.removeEventListener('input', this._onInput);
        this._htmlElement.removeEventListener('keyup', this._onKeyup);
        this._htmlElement.removeEventListener('paste', this._onPaste);
        this._htmlElement.removeEventListener('focus', this._onFocus);
        this._htmlElement.removeEventListener('blur', this._onBlur);
        this._htmlElementContainer.removeEventListener('mouseenter', this._onMouseEnter);
        this._htmlElementContainer.removeEventListener('mouseleave', this._onMouseLeave);
        this.onDestroy.emit();
    } 


    //computed
    protected _dataSource = computed<any[]>(() => {
        return Collections.SetIndex([
            { id: 1, name: "Holfffffffffffeeeeeeeeeee " },
            { id: 2, name: "Hola2" },
            { id: 3, name: "Hola3" },
            { id: 4, name: "Hola4" },
            { id: 5, name: "Hola5" },
            { id: 6, name: "Holfffffffffffeeeeeeeeeee " },
            { id: 7, name: "Hola2" },
            { id: 8, name: "Hola3" },
            { id: 9, name: "Hola4" },
            { id: 10, name: "Hola5" }
        ]);
    });


    //getter
    public get isEnabled(): boolean {
        return this.isLoading()   === false 
            && this.isReadonly()  === false
            && this.isInvisible() === false
            && this.isHidden()    === false
    }


    //getter
    protected get _showClearButton() {
        return this.showClearButton()
            && this.isEnabled 
            && this.IsNotOnlyWhiteSpace(this._value) 
    }


    //computed
    protected _paddingRight = computed<string>(() => {
        let padding = 30;
       
              
       
        return `${padding}px`;
    });


    //getter
    protected get _label(): string {
        return this.IsOnlyWhiteSpace(this.label()) ? this.placeholder(): this.label();
    } 


    /** */
    private _onInput = () => {
        
    } 

    /** */
    private _onKeyup = (event: KeyboardEvent) => {
        
    } 

    /** */
    private _onPaste = () => {
                
    } 

    /** */
    private _onFocus = () => {
        if(this._isLoading) return; 
        if(this.isEnabled) this.Focus(true);
        else this.Blur(); 
    } 

    /** */
    private _onBlur = () => {        
        if(this._isLoading || this._isHoverElement) return;
        else this.Blur();
    }  

    /** */
    private _onMouseEnter = () => this._isHoverElement = true;  
    private _onMouseLeave = () => this._isHoverElement = false;


    /** */
    public async Focus(open: boolean = true) { 
        if(this.isEnabled) {
            this._isLoading = true;  
            await Tools.Sleep();             
            
            this._htmlElement.focus();
            this._isCollapsed.set(false);  
            this._isFocused = true;
            
            //if(open) this._htmlElement.select();
            this.ScrollToElement();
             
            this._isLoading = false; 
        }
        
        else this.Blur();   
    }

    /** */
    public async Blur() {       
        this._isLoading = true; 
        await Tools.Sleep();

        this._htmlElement.blur();  
        this._isCollapsed.set(true); 
        this._isFocused = false;

        
        this._isLoading = false; 
    }

    /** */
    public Clear(): void {
        
    } 

    /** */
    protected GetDisplay = (item: any) => { 
        return Tools.HasProperty(item, this.displayProperty()) ? item[this.displayProperty()] : '';
    }

    /** */
    protected Toggle = async () => { 
        if(this.isReadonly()) return;
        if(this._isCollapsed()) this.Focus();
        else this.Blur();
    }  

    /** */
    public ScrollToElement(): void {
        HTMLElements.ScrollToElement(this._htmlElement); 
    }
}
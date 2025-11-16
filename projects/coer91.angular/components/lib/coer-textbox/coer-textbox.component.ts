import { Component, input, AfterViewInit, output, OnDestroy, computed } from '@angular/core';
import { CONTROL_VALUE, ControlValue } from '@library/tools';
import { HTMLElements, Tools } from 'coer91.tools';

@Component({
    selector: 'coer-textbox',
    templateUrl: './coer-textbox.component.html', 
    styleUrl: './coer-textbox.component.scss',
    providers: [CONTROL_VALUE(CoerTextBox)],
    standalone: false
})
export class CoerTextBox extends ControlValue implements AfterViewInit, OnDestroy {
    
    protected override _value: string | number = '';

    //Variables
    protected _id = Tools.GetGuid("coer-textbox");
    protected _element!: HTMLInputElement;
    protected _isFocused: boolean = false; 

    //output
    public onInput      = output<string | number>();
    public onKeyupEnter = output<string | number>();
    public onClear      = output<void>();
    public onSearch     = output<string | number>();
    public onReady      = output<void>();
    public onDestroy    = output<void>();

    //input
    public label            = input<string>('');
    public placeholder      = input<string>('');
    public isLoading        = input<boolean>(false); 
    public isReadonly       = input<boolean>(false);
    public isInvisible      = input<boolean>(false);
    public isHidden         = input<boolean>(false);
    public selectOnFocus    = input<boolean>(true);  
    public textPosition     = input<'left' | 'center' | 'right'>('left'); 
    public minLength        = input<number | string>(0);
    public maxLength        = input<number | string>(50);
    public showClearButton  = input<boolean>(false);
    public showSearchButton = input<boolean>(false);
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
        this._element = HTMLElements.GetElementById(this._id) as HTMLInputElement;
        this._element.addEventListener('input', this._onInput);
        this._element.addEventListener('keyup', this._onKeyup);
        this._element.addEventListener('paste', this._onPaste);
        this._element.addEventListener('focus', this._onFocus);
        this._element.addEventListener('blur', this._onBlur);
        this.onReady.emit();
    }


    //OnDestroy
    ngOnDestroy() {
        this._element.removeEventListener('input', this._onInput);
        this._element.removeEventListener('keyup', this._onKeyup);
        this._element.removeEventListener('paste', this._onPaste);
        this._element.removeEventListener('focus', this._onFocus);
        this._element.removeEventListener('blur', this._onBlur);
        this.onDestroy.emit();
    } 


    //getter
    public get isEnabled(): boolean {
        return this.isLoading()   === false 
            && this.isReadonly()  === false
            && this.isInvisible() === false
            && this.isHidden()    === false
    }


    //computed
    protected _paddingRight = computed<string>(() => {
        let padding = 10;
        const clearOrSearch = (this._showClearIcon || this._showSearchIcon);
        const validOrInvalid = (this.isValid() || this.isInvalid());   
              
        if(clearOrSearch && validOrInvalid) padding = 50;
        else if (clearOrSearch || validOrInvalid) padding = 25;
        return `${padding}px`;
    });


    //getter
    protected get _label(): string {
        return this.IsOnlyWhiteSpace(this.label()) ? this.placeholder(): this.label();
    } 


    //getter
    protected get _showClearIcon() {
        return this.showClearButton()
            && this.isEnabled 
            && this.IsNotOnlyWhiteSpace(this._value) 
    }


    //getter
    protected get _showSearchIcon() {
        return this.showSearchButton()
            && !this._showClearIcon
            && this.isEnabled
    }


    /** */
    private _onInput = () => {
        if(!this.isEnabled) return; 
        this.onInput.emit(this._value);
    } 

    /** */
    private _onKeyup = (event: KeyboardEvent) => {
        if(!this.isEnabled) return;

        if (event.key === 'Enter') {
            this.onKeyupEnter.emit(this._value);
            this.Blur();
        }
    } 

    /** */
    private _onPaste = () => {
        Tools.Sleep().then(() => this.setValue(this._value.toString().trim()));        
    } 

    /** */
    private _onFocus = () => {
        if(!this.isEnabled) this.Blur(); 
        if(this.selectOnFocus() === true) this.Focus(true);
    } 

    /** */
    private _onBlur = () => {
        this.Blur();  
    }  

    /** */
    public Focus(select: boolean = false): void {
        if(!this.isEnabled) {
            this.Blur();
            return;
        }
        
        Tools.Sleep().then(() => {
            this._element.focus();
            if(select) this._element.select();
            this._isFocused = true;
        }); 
    }

    /** */
    public Blur(): void {      
        this._element.blur();  
        this._isFocused = false;
    }

    /** */
    public Clear(): void {
        this.setValue('');
        this.Focus(false);
        this.onClear.emit();
    }

    /** */
    protected _ClickSearch(): void {         
        if (this.showClearButton()) this.Focus();
        else this.Blur();
        this.onSearch.emit(this._value);
    }
}
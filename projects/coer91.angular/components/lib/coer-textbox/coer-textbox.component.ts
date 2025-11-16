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

    //input
    public label         = input<string>('');
    public placeholder   = input<string>('');
    public isLoading     = input<boolean>(false); 
    public isReadonly    = input<boolean>(false);
    public isInvisible   = input<boolean>(false);
    public isHidden      = input<boolean>(false);
    public selectOnFocus = input<boolean>(true);  
    public textPosition  = input<'left' | 'center' | 'right'>('left'); 

    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep();
        this._element = HTMLElements.GetElementById(this._id) as HTMLInputElement;
        this._element.addEventListener('input', this._onInput);
        this._element.addEventListener('keyup', this._onKeyup);
        this._element.addEventListener('paste', this._onPaste);
        this._element.addEventListener('focus', this._onFocus);
        this._element.addEventListener('blur', this._onBlur);
    }


    //OnDestroy
    ngOnDestroy() {
        this._element.removeEventListener('input', this._onInput);
        this._element.removeEventListener('keyup', this._onKeyup);
        this._element.removeEventListener('paste', this._onPaste);
        this._element.removeEventListener('focus', this._onFocus);
        this._element.removeEventListener('blur', this._onBlur);
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
        return `${padding}px`;
    });


    //getter
    protected get _label(): string {
        return this.IsOnlyWhiteSpace(this.label()) ? this.placeholder(): this.label();
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
}
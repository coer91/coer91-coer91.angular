import { Component, input, AfterViewInit, output, OnDestroy, computed, signal, EffectRef, effect } from '@angular/core';
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
    protected readonly _effectValue!: EffectRef; 
    protected readonly _isCollapsed = signal<boolean>(true); 
    protected readonly _search = signal<string>('');
    protected readonly _applySearch = signal<boolean>(false);
    protected _htmlElementContainer!: HTMLInputElement; 
    protected _htmlElement!: HTMLInputElement; 
    protected _isHoverElement: boolean = false;
    protected _isFocused: boolean = false;
    protected _isLoading: boolean = false; 

    //output
    public onInput       = output<string | number>();
    public onKeyupEnter  = output<string | number>();
    public onClear       = output<void>(); 
    public onValueChange = output<T | null>();
    public onReady       = output<void>();
    public onDestroy     = output<void>();

    //input
    public label            = input<string>('');
    public placeholder      = input<string>('');
    public displayProperty  = input<string>('name');
    public dataSource       = input<T[]>([]);
    public isLoading        = input<boolean>(false); 
    public isReadonly       = input<boolean>(false);
    public isInvisible      = input<boolean>(false);
    public isHidden         = input<boolean>(false);   
    public textPosition     = input<'left' | 'center' | 'right'>('left');  
    public minLength        = input<number | string>(0);
    public maxLength        = input<number | string>(50);
    public showClearButton  = input<boolean>(true);
    public isInvalid        = input<boolean>(false);
    public isValid          = input<boolean>(false); 
    public width            = input<string>('');
    public minWidth         = input<string>('100px');
    public maxWidth         = input<string>('100%'); 
    public marginTop        = input<string>('0px');
    public marginRight      = input<string>('0px');
    public marginBottom     = input<string>('0px');
    public marginLeft       = input<string>('0px');

    constructor() {
        super();

        this._effectValue = effect(() => { 
             
        });
    }


    /** Sets the value of the component */
    protected override setValue(value: any): void {
        if(typeof this._UpdateValue === 'function') {
            this._UpdateValue(value); 
        } 
         
        this._value = value;
        this._UpdateSearch(value);  
    }


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
        this._effectValue?.destroy();
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
        return Collections.SetIndex(this.dataSource())
            .filter((item: any) => Tools.IsNotOnlyWhiteSpace(this._search()) && this._applySearch()
                ? String(item[this.displayProperty()]).toUpperCase().includes(this._search().toUpperCase()) 
                : true
            );
    });


    //getter
    public get isEnabled(): boolean {
        return this.isLoading()   === false 
            && this.isReadonly()  === false
            && this.isInvisible() === false
            && this.isHidden()    === false
    }


    //getter
    protected get _showClearButton(): boolean {
        return this.showClearButton()
            && this.isEnabled 
            && this.IsNotOnlyWhiteSpace(this._value)
            && this.IsOnlyWhiteSpace(this._search()) 
    }


    //computed
    protected get _paddingRight(): string {
        let padding = 30;
        if(this._showClearButton) padding += 25;      
        return `${padding}px`;
    }


    //getter
    protected get _label(): string {
        return this.IsOnlyWhiteSpace(this.label()) ? this.placeholder(): this.label();
    } 


    /** */
    private _onInput = () => {
        
    } 

    /** */
    private _onKeyup = (event: KeyboardEvent) => {
        const { key } = event;

        if(['ArrowUp', 'ArrowDown'].includes(key)) {
            if(key === 'ArrowUp') {
                console.log('ArrowUp')
            }
    
            if(key === 'ArrowDown') {
                console.log('ArrowDown')
            }

            return;
        }

        this._applySearch.set(true); 

        if(key === 'Enter') { 
            const item = this._dataSource().find((item: any) => String(item[this.displayProperty()]).equals(this._search()));
            if(item) this.setValue(item);
            this.Blur();
        }

        if(key === 'Delete') { 
            if(this._showClearButton) this.Clear();
        }
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
        this._applySearch.set(Tools.IsOnlyWhiteSpace(this._value));

        if(this.isEnabled) {
            this._isLoading = true;  
            await Tools.Sleep();             
            
            this._htmlElement.select();
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
        this._search.set(Tools.IsNotOnlyWhiteSpace(this._value) ? (this._value as any)[this.displayProperty()] : '');   
        await Tools.Sleep();

        this._htmlElement.blur();  
        this._isCollapsed.set(true); 
        this._isFocused = false;  

        this._isLoading = false;  
    }

    /** */
    public Clear(): void {
        this.setValue(null);
        this.Blur();  
        this.onValueChange.emit(null);
        this.onClear.emit();
    } 

    /** */
    protected GetDisplay = (item: any) => { 
        return Tools.HasProperty(item, this.displayProperty()) ? item[this.displayProperty()] : '';
    }

    /** */
    protected Toggle = async () => { 
        if(!this.isEnabled) return;
        if(this._isCollapsed()) this.Focus();
        else this.Blur();
    }  

    /** */
    public ScrollToElement(): void {
        HTMLElements.ScrollToElement(this._htmlElement); 
    }


    /** */
    protected _UpdateSearch(item: any) {
        this._search.set(Tools.IsNotOnlyWhiteSpace(item) ? (item as any)[this.displayProperty()] : '');  
    } 


    /** */
    protected _ClickOption = async (item: any) => { 
        this.Blur();        
        await Tools.Sleep();          
        this.setValue(item); 
        this._UpdateSearch(item);   

        const _item = { ...item };
        if(Tools.HasProperty(_item, 'index')) delete _item['index'];
        this.onValueChange.emit(_item);
    } 
}
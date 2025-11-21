import { Component, AfterViewInit, OnDestroy, signal, input } from '@angular/core';
import { HTMLElements, Tools }from 'coer91.tools';
import { IMenu, IMenuSelected } from 'coer91.tools/interfaces';
import { menuSelectedSIGNAL, navigationSIGNAL } from 'projects/coer91.angular/signals';

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
    protected readonly _menuSelected = menuSelectedSIGNAL; 
    protected readonly _navigation = navigationSIGNAL();
     
    //output 

    //input 
    public navigation = input<IMenu[]>([]); 

    constructor() {
        
    }

    //AfterViewInit
    async ngAfterViewInit() { 
    }


    //OnDestroy
    ngOnDestroy() {
        
    }  
    
 
    /** */
    public Toogle() {
        if(this._isOpen()) this.Close();
        else this.Open();
    }


    /** */
    public Open() {
        this._isOpen.set(true);
    }


    /** */
    public Close() {
        this._isOpen.set(false);
    }


    /** */
    protected _IsOption(menu: IMenu) {
        return Tools.IsNull(menu?.items) && Tools.IsNotOnlyWhiteSpace(menu.path)
    }  


    /** */
    protected _ClickOptionLv1(lv1: IMenu, id: string) {
        this._Clickoption({
            id,
            menu: { ...lv1 }, 
            level: 'LV1',
            action: 'NONE',
            tree: [
                { id: lv1.id!, label: lv1.label, icon: lv1?.icon || '' }
            ]
        });
    }


    /** */
    protected _ClickOptionLv2(lv2: IMenu, lv1: IMenu, id: string) {
        this._Clickoption({
            id,
            menu: { ...lv2 }, 
            level: 'LV2',
            action: 'NONE',
            tree: [
                { id: lv1.id!, label: lv1.label, icon: lv1?.icon || '' }, 
                { id: lv2.id!, label: lv2.label, icon: lv2?.icon || '' }
            ]
        });
    }


    /** */
    protected _ClickOptionLv3(lv3: IMenu, lv2: IMenu, lv1: IMenu, id: string) {
        this._Clickoption({
            id,
            menu: { ...lv3 }, 
            level: 'LV3',
            action: 'NONE',
            tree: [
                { id: lv1.id!, label: lv1.label, icon: lv1?.icon || '' }, 
                { id: lv2.id!, label: lv2.label, icon: lv2?.icon || '' }, 
                { id: lv3.id!, label: lv3.label, icon: lv3?.icon || '' }
            ]
        });
    }


    /** */
    protected _ClickMenu(lv1: IMenu, isOpen: boolean, id: string) {
        this._Clickoption({
            id,
            menu: { ...lv1 }, 
            level: 'LV1',
            action: isOpen ? 'OPEN' : 'CLOSED',
            tree: [
                { id: lv1.id!, label: lv1.label, icon: lv1?.icon || '' }
            ]
        });
    }


    /** */
    protected _ClickSubmenu(lv2: IMenu, lv1: IMenu, isOpen: boolean, id: string) {
        this._Clickoption({
            id, 
            menu: { ...lv2 }, 
            level: 'LV2',
            action: isOpen ? 'OPEN' : 'CLOSED',
            tree: [
                { id: lv1.id!, label: lv1.label, icon: lv1?.icon || '' }, 
                { id: lv2.id!, label: lv2.label, icon: lv2?.icon || '' }
            ]
        });
    }


    /** */
    protected _Clickoption(option: IMenuSelected) {
        HTMLElements.AddClass(`#${option.id}`, 'selected');
        
    }
}
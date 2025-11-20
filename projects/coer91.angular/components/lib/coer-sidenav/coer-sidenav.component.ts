import { Component, AfterViewInit, OnDestroy, signal, input, computed } from '@angular/core';
import { Tools }from 'coer91.tools';
import { IMenu } from 'coer91.tools/interfaces';
import { NAVIGATION } from 'projects/documentation/src/navigation';

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
    public navigation = input<IMenu[]>([]); 

    constructor() {
        
    }

    //AfterViewInit
    async ngAfterViewInit() { 
    }


    //OnDestroy
    ngOnDestroy() {
        
    }  


    //
    protected _datasource = computed<IMenu[]>(() => {
        return NAVIGATION; // this.navigation()
    });

 
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
    protected _ClickOptionLv1(lv1: IMenu) {
        console.log({
            menu: { ...lv1 }, 
            level: 'LV1',
            action: 'NONE',
            tree: [
                { id: lv1.id, label: lv1.label, icon: lv1.icon }
            ]
        });
    }

    /** */
    protected _ClickOptionLv2(lv2: IMenu, lv1: IMenu) {
        console.log({
            menu: { ...lv2 }, 
            level: 'LV2',
            action: 'NONE',
            tree: [
                { id: lv1.id, label: lv1.label, icon: lv1.icon }, 
                { id: lv2.id, label: lv2.label, icon: lv2.icon }
            ]
        });
    }

    /** */
    protected _ClickOptionLv3(lv3: IMenu, lv2: IMenu, lv1: IMenu) {
        console.log({
            menu: { ...lv3 }, 
            level: 'LV3',
            action: 'NONE',
            tree: [
                { id: lv1.id, label: lv1.label, icon: lv1.icon }, 
                { id: lv2.id, label: lv2.label, icon: lv2.icon }, 
                { id: lv3.id, label: lv3.label, icon: lv3.icon }
            ]
        });
    }

    /** */
    protected _ClickMenu(lv1: IMenu, isOpen: boolean) {
        console.log({
            menu: { ...lv1 }, 
            level: 'LV1',
            action: isOpen ? 'OPEN' : 'CLOSED',
            tree: [
                { id: lv1.id, label: lv1.label, icon: lv1.icon }
            ]
        });
    }

    /** */
    protected _ClickSubmenu(lv2: IMenu, lv1: IMenu, isOpen: boolean) {
        console.log({
            menu: { ...lv2 }, 
            level: 'LV2',
            action: isOpen ? 'OPEN' : 'CLOSED',
            tree: [
                { id: lv1.id, label: lv1.label, icon: lv1.icon }, 
                { id: lv2.id, label: lv2.label, icon: lv2.icon }
            ]
        });
    }
}
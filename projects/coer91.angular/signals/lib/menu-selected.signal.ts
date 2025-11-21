import { signal } from "@angular/core";
import { IMenuSelected } from "coer91.tools/interfaces";
export const menuSelectedSIGNAL = signal<IMenuSelected | null>(null);
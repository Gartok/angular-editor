import { ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { AngularEditorService } from './angular-editor.service';
import { CustomClass, Font } from './config';
export declare class AngularEditorToolbarComponent {
    private r;
    private editorService;
    private doc;
    id: string;
    htmlMode: boolean;
    showToolbar: boolean;
    linkSelected: boolean;
    block: string;
    defaultFontId: any;
    fontName: any;
    fontSize: string;
    foreColour: any;
    backColor: any;
    fonts: Font[];
    customClassId: number;
    customClasses: CustomClass[];
    uploadUrl: string;
    tagMap: {
        BLOCKQUOTE: string;
        A: string;
    };
    select: string[];
    buttons: string[];
    execute: EventEmitter<string>;
    myInputFile: ElementRef;
    readonly isLinkButtonDisabled: boolean;
    constructor(r: Renderer2, editorService: AngularEditorService, doc: any);
    /**
     * Trigger command from editor header buttons
     * @param command string from toolbar buttons
     */
    triggerCommand(command: string): void;
    /**
     * highlight editor buttons when cursor moved or positioning
     */
    triggerButtons(): void;
    /**
     * trigger highlight editor buttons when cursor moved or positioning in block
     */
    triggerBlocks(nodes: Node[]): void;
    /**
     * insert URL link
     */
    insertUrl(): void;
    /**
    **
     * insert URL link
     */
    insertSlide(): void;
    /**
     * insert Video link
     */
    insertVideo(): void;
    /** insert color */
    insertColor(color: string, where: string): void;
    /**
     * set font Name/family
     * @param foreColor string
     */
    setFontName(foreColor: string): void;
    /**
     * set font Size
     * @param fontSize string
     */
    setFontSize(fontSize: string): void;
    /**
     * toggle editor mode (WYSIWYG or SOURCE)
     * @param m boolean
     */
    setEditorMode(m: boolean): void;
    /**
     * Upload image when file is selected
     */
    onFileChanged(event: any): void;
    /**
     * Reset Input
     */
    fileReset(): void;
    /**
     * Set custom class
     */
    setCustomClass(classId: number): void;
}

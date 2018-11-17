// Type definitions for mem-fs-editor 5.1
// Project: https://github.com/SBoudrias/mem-fs-editor#readme
// Definitions by: My Food Bag <https://github.com/MyFoodBag>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

/// <reference types="node" />

import * as Buffer from 'buffer';
import { Transform } from 'stream';
import { Store } from 'mem-fs';
import { Options as TemplateOptions, Data as TemplateData } from 'ejs';
import { IOptions as GlobOptions } from 'glob';

export namespace memFsEditor {
    type Contents = string|Buffer;

    type ReplacerFunc = (key: string, value: any) => any;

    type Space = string|number;

    type ProcessFunc = (contents: Buffer) => Contents;

    type Callback = (err: any) => any;

    interface CopyOptions {
        process?: ProcessFunc;
        globOptions?: GlobOptions;
    }

    interface Editor {
        read(filepath: string, options?: { raw?: boolean, defaults: string }): string;
        readJSON(filepath: string, defaults?: any): any;
        exists(filepath: string): boolean;
        write(filepath: string, contents: Contents): string;
        writeJSON(filepath: string, contents: any, replacer?: ReplacerFunc, space?: Space): string;
        append(to: string, contents: Contents, options?: { trimEnd?: boolean, separator?: string }): string; // TODO: check contents type
        delete(paths: string|string[], options?: { globOptions?: GlobOptions }): void;
        copy(from: string|string[], to: string, options?: CopyOptions, context?: TemplateData, templateOptions?: TemplateOptions): void;
        copyTpl(from: string|string[], to: string, context?: TemplateData, templateOptions?: TemplateOptions, copyOptions?: CopyOptions): void;
        move(from: string|string[], to: string, options?: { globOptions: GlobOptions }): void;
        commit(callback: Callback): void;
        commit(filters: ReadonlyArray<Transform>, callback: Callback): void;
    }
}

export type Editor = memFsEditor.Editor;
export function create(store: Store): Editor;

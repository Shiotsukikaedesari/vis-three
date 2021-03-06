import { Compiler } from "../../core/Compiler";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { AnimationAllType } from "./AnimationConfig";
export declare class AnimationCompiler extends Compiler<AnimationAllType, Function> {
    MODULE: MODULETYPE;
    constructor();
    cover(config: AnimationAllType): this;
    remove(config: AnimationAllType): this;
    compile(vid: string, notice: ProxyNotice): this;
}

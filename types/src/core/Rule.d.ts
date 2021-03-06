import { BasicCompiler } from "./Compiler";
import { ProxyNotice } from "./ProxyBroadcast";
export declare type Rule<C extends BasicCompiler> = (input: ProxyNotice, output: C, validateFun?: (key: string) => boolean) => void;
export declare const Rule: Rule<BasicCompiler>;

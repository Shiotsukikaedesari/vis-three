import { EngineSupport } from "../../engine/EngineSupport";
import { ObjectEvent } from "../../manager/EventManager";
export interface BasicEventConfig {
    name: string;
}
export declare type EventGenerator<C extends BasicEventConfig> = (engine: EngineSupport, config: C) => (event?: ObjectEvent) => void;
export declare class EventLibrary {
    private static configLibrary;
    private static generatorLibrary;
    static register: <C extends BasicEventConfig>(config: C, generator: EventGenerator<C>) => void;
    static generateConfig(name: string, merge: object): BasicEventConfig;
    static generateEvent(config: BasicEventConfig, engine: EngineSupport): (event?: ObjectEvent) => void;
    static has(name: string): boolean;
}

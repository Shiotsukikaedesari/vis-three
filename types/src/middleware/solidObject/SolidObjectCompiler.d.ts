import { Event, Mesh, Object3D } from "three";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";
export interface SolidObject3D extends Object3D<Event> {
    material: Mesh["material"];
    geometry: Mesh["geometry"];
}
export declare type BasicSolidObjectCompiler = SolidObjectCompiler<SolidObjectConfig, SolidObject3D>;
export declare abstract class SolidObjectCompiler<C extends SolidObjectConfig, O extends SolidObject3D> extends ObjectCompiler<C, O> {
    constructor();
}

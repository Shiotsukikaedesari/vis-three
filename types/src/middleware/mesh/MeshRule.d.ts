import { Mesh } from "three";
import { SolidObjectRule } from "../solidObject/SolidObjectRule";
import { MeshCompiler } from "./MeshCompiler";
import { MeshConfig } from "./MeshConfig";
export declare type MeshRule = SolidObjectRule<MeshCompiler, MeshConfig, Mesh>;
export declare const MeshRule: MeshRule;

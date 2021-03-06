import { Scene } from "three";
import { ObjectRule } from "../object/ObjectRule";
import { SceneCompiler } from "./SceneCompiler";
import { SceneConfig } from "./SceneConfig";
export declare type SceneRule = ObjectRule<SceneCompiler, SceneConfig, Scene>;
export declare const SceneRule: SceneRule;

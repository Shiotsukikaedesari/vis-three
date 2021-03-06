import { Points } from "three";
import { SolidObjectRule } from "../solidObject/SolidObjectRule";
import { PointsCompiler } from "./PointsCompiler";
import { PointsConfig } from "./PointsConfig";
export declare type PointsRule = SolidObjectRule<PointsCompiler, PointsConfig, Points>;
export declare const PointsRule: PointsRule;

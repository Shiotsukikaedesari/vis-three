import { Camera } from "three";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { CameraCompiler, CameraCompilerTarget } from "./CameraCompiler";
import { CameraConfigAllType } from "./CameraConfig";
import { CameraRule } from "./CameraRule";
export class CameraDataSupport extends ObjectDataSupport<
  CameraRule,
  CameraCompiler,
  CameraConfigAllType,
  CameraCompilerTarget,
  Camera
> {

  constructor (data?: CameraCompilerTarget) {
    !data && (data = {})
    super(CameraRule, data)
  }
}
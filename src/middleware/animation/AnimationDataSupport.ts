import { CompilerTarget } from "../../core/Compiler";
import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { AnimationCompiler } from "./AnimationCompiler";
import { AnimationAllType } from "./AnimationConfig";
import { AnimationRule } from "./AnimationRule";

export class AnimationDataSupport extends DataSupport<
  AnimationAllType,
  Function,
  AnimationCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.ANIMATION;

  constructor(
    data?: CompilerTarget<AnimationAllType>,
    ignore?: IgnoreAttribute
  ) {
    !data && (data = {});
    super(AnimationRule, data, ignore);
  }
}

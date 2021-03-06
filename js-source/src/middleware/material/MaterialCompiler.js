import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import LineBasicMaterialProcessor from "./processor/LineBasicMaterialProcessor";
import MeshBasicMaterialProcessor from "./processor/MeshBasicMaterialProcessor";
import MeshPhongMaterialProcessor from "./processor/MeshPhongMaterialProcessor";
import MeshStandardMaterialProcessor from "./processor/MeshStandardMaterialProcessor";
import PointsMaterialProcessor from "./processor/PointsMaterialProcessor";
import ShaderMaterialProcessor from "./processor/ShaderMaterialProcessor";
import SpriteMaterialProcessor from "./processor/SpriteMaterialProcessor";
export class MaterialCompiler extends Compiler {
    MODULE = MODULETYPE.MATERIAL;
    constructor() {
        super();
    }
}
Compiler.processor(MeshBasicMaterialProcessor);
Compiler.processor(MeshStandardMaterialProcessor);
Compiler.processor(MeshPhongMaterialProcessor);
Compiler.processor(LineBasicMaterialProcessor);
Compiler.processor(PointsMaterialProcessor);
Compiler.processor(SpriteMaterialProcessor);
Compiler.processor(LineBasicMaterialProcessor);
Compiler.processor(ShaderMaterialProcessor);
//# sourceMappingURL=MaterialCompiler.js.map
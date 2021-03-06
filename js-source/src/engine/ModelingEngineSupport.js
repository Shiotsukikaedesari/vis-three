import { ENGINEPLUGIN } from "./Engine";
import { EngineSupport } from "./EngineSupport";
export class ModelingEngineSupport extends EngineSupport {
    IS_ENGINESUPPORT = true;
    constructor(parameters) {
        super(parameters);
        this.install(ENGINEPLUGIN.WEBGLRENDERER, {
            antialias: true,
            alpha: true,
        })
            .install(ENGINEPLUGIN.EFFECTCOMPOSER, {
            WebGLMultisampleRenderTarget: true,
        })
            .install(ENGINEPLUGIN.SELECTION)
            .install(ENGINEPLUGIN.AXESHELPER)
            .install(ENGINEPLUGIN.GRIDHELPER)
            .install(ENGINEPLUGIN.OBJECTHELPER)
            .install(ENGINEPLUGIN.VIEWPOINT)
            .install(ENGINEPLUGIN.DISPLAYMODE)
            .install(ENGINEPLUGIN.STATS)
            .install(ENGINEPLUGIN.ORBITCONTROLS)
            .install(ENGINEPLUGIN.KEYBOARDMANAGER)
            .install(ENGINEPLUGIN.TRANSFORMCONTROLS)
            .complete();
    }
}
//# sourceMappingURL=ModelingEngineSupport.js.map
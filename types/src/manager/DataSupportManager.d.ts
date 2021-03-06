import { TextureDataSupport } from "../middleware/texture/TextureDataSupport";
import { MaterialDataSupport } from "../middleware/material/MaterialDataSupport";
import { LightDataSupport } from "../middleware/light/LightDataSupport";
import { GeometryDataSupport } from "../middleware/geometry/GeometryDataSupport";
import { CameraDataSupport } from "../middleware/camera/CameraDataSupport";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { RendererDataSupport } from "../middleware/renderer/RendererDataSupport";
import { SceneDataSupport } from "../middleware/scene/SceneDataSupport";
import { ControlsDataSupport } from "../middleware/controls/ControlsDataSupport";
import { CompilerTarget } from "../core/Compiler";
import { SpriteDataSupport } from "../middleware/sprite/SpriteDataSupport";
import { LineDataSupport } from "../middleware/line/LineDataSupport";
import { MeshDataSupport } from "../middleware/mesh/MeshDataSupport";
import { PointsDataSupport } from "../middleware/points/PointsDataSupport";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { GroupDataSupport } from "../middleware/group/GroupDataSupport";
import { PassDataSupport } from "../middleware/pass/PassDataSupport";
import { AnimationDataSupport } from "../middleware/animation/AnimationDataSupport";
import { CSS3DDataSupport } from "../middleware/css3D/CSS3DDataSupport";
import { TextureAllType } from "../middleware/texture/TextureConfig";
import { MaterialAllType } from "../middleware/material/MaterialConfig";
import { GeometryAllType } from "../middleware/geometry/GeometryInterface";
import { LightConfigAllType } from "../middleware/light/LightConfig";
import { CameraConfigAllType } from "../middleware/camera/CameraConfig";
import { SpriteConfig } from "../middleware/sprite/SpriteConfig";
import { LineConfig } from "../middleware/line/LineConfig";
import { MeshConfig } from "../middleware/mesh/MeshConfig";
import { PointsConfig } from "../middleware/points/PointsConfig";
import { GroupConfig } from "../middleware/group/GroupConfig";
import { CSS3DAllType } from "../middleware/css3D/CSS3DConfig";
import { RendererConfigAllType } from "../middleware/renderer/RendererConfig";
import { SceneConfig } from "../middleware/scene/SceneConfig";
import { PassConfigAllType } from "../middleware/pass/PassConfig";
import { ControlsAllConfig } from "../middleware/controls/ControlsConfig";
import { AnimationAllType } from "../middleware/animation/AnimationConfig";
export interface LoadOptions {
    [MODULETYPE.TEXTURE]?: CompilerTarget<TextureAllType>;
    [MODULETYPE.MATERIAL]?: CompilerTarget<MaterialAllType>;
    [MODULETYPE.GEOMETRY]?: CompilerTarget<GeometryAllType>;
    [MODULETYPE.LIGHT]?: CompilerTarget<LightConfigAllType>;
    [MODULETYPE.CAMERA]?: CompilerTarget<CameraConfigAllType>;
    [MODULETYPE.SPRITE]?: CompilerTarget<SpriteConfig>;
    [MODULETYPE.LINE]?: CompilerTarget<LineConfig>;
    [MODULETYPE.MESH]?: CompilerTarget<MeshConfig>;
    [MODULETYPE.POINTS]?: CompilerTarget<PointsConfig>;
    [MODULETYPE.GROUP]?: CompilerTarget<GroupConfig>;
    [MODULETYPE.CSS3D]?: CompilerTarget<CSS3DAllType>;
    [MODULETYPE.RENDERER]?: CompilerTarget<RendererConfigAllType>;
    [MODULETYPE.SCENE]?: CompilerTarget<SceneConfig>;
    [MODULETYPE.PASS]?: CompilerTarget<PassConfigAllType>;
    [MODULETYPE.CONTROLS]?: CompilerTarget<ControlsAllConfig>;
    [MODULETYPE.ANIMATION]?: CompilerTarget<AnimationAllType>;
}
export interface DataSupportManagerParameters {
    cameraDataSupport?: CameraDataSupport;
    lightDataSupport?: LightDataSupport;
    geometryDataSupport?: GeometryDataSupport;
    textureDataSupport?: TextureDataSupport;
    materialDataSupport?: MaterialDataSupport;
    rendererDataSupport?: RendererDataSupport;
    sceneDataSupport?: SceneDataSupport;
    controlsDataSupport?: ControlsDataSupport;
    spriteDataSupport?: SpriteDataSupport;
    lineDataSupport?: LineDataSupport;
    meshDataSupport?: MeshDataSupport;
    pointsDataSupport?: PointsDataSupport;
    groupDataSupport?: GroupDataSupport;
    css3DDataSupport?: CSS3DDataSupport;
    passDataSupport?: PassDataSupport;
    animationDataSupport?: AnimationDataSupport;
}
export declare class DataSupportManager {
    cameraDataSupport: CameraDataSupport;
    lightDataSupport: LightDataSupport;
    geometryDataSupport: GeometryDataSupport;
    textureDataSupport: TextureDataSupport;
    materialDataSupport: MaterialDataSupport;
    rendererDataSupport: RendererDataSupport;
    sceneDataSupport: SceneDataSupport;
    controlsDataSupport: ControlsDataSupport;
    spriteDataSupport: SpriteDataSupport;
    lineDataSupport: LineDataSupport;
    meshDataSupport: MeshDataSupport;
    pointsDataSupport: PointsDataSupport;
    groupDataSupport: GroupDataSupport;
    css3DDataSupport: CSS3DDataSupport;
    passDataSupport: PassDataSupport;
    animationDataSupport: AnimationDataSupport;
    private dataSupportMap;
    constructor(parameters?: DataSupportManagerParameters);
    /**
     * ?????????????????????????????????
     * @param type MODULETYPE
     * @returns DataSupport
     */
    getDataSupport<D>(type: MODULETYPE): D | null;
    /**
     * @experimental ??????????????????????????????????????????
     */
    getSupportData(type: MODULETYPE): CompilerTarget<SymbolConfig> | null;
    /**
     * @experimental ??????????????????????????????????????????
     */
    setSupportData(type: MODULETYPE, data: CompilerTarget<SymbolConfig>): this;
    /**
     * ??????vid??????????????????????????????
     * @param vid vid??????
     * @returns config || null
     */
    getConfigBySymbol<T extends SymbolConfig>(vid: string): T | null;
    /**
     * ??????vid??????????????????????????????
     * @param vid ...vid??????
     * @returns this
     */
    removeConfigBySymbol(...vids: string[]): this;
    /**
     * ??????vid????????????????????????????????????
     * @param vid vid??????
     * @returns MODULETYPE || null
     */
    getModuleBySymbol(vid: string): MODULETYPE | null;
    /**
     * ??????????????????
     * @param config vis??????????????????
     * @returns this
     */
    applyConfig<T extends SymbolConfig>(...configs: T[]): this;
    /**
     * ???????????????????????????
     * @param config vis??????????????????
     * @returns config
     */
    reactiveConfig<T extends SymbolConfig>(config: T): T;
    /**
     * ???????????????????????????
     * @param config ??????vis??????????????????????????????
     * @returns this
     */
    load(config: LoadOptions): this;
    /**
     * ?????????????????????????????????
     * @param config  ??????vis??????????????????????????????
     * @returns this
     */
    remove(config: LoadOptions): this;
    /**
     * ??????JSON???????????????
     * @param extendsConfig ????????????JSON???????????????????????????dataSupport???????????????
     * @param compress ????????????????????? default true
     * @returns JSON string
     */
    toJSON(extendsConfig?: object, compress?: boolean): string;
    /**
     * ???????????????
     * @param extendsConfig ??????????????????
     * @param compress ????????????????????? default true
     * @returns LoadOptions
     */
    exportConfig(extendsConfig?: object, compress?: boolean): LoadOptions;
}

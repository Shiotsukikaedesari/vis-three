import { BufferGeometry, Material, Object3D, Texture } from "three";
import { EngineSupport } from "../engine/EngineSupport";
import { AnimationCompiler } from "../middleware/animation/AnimationCompiler";
import { CameraCompiler } from "../middleware/camera/CameraCompiler";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { ControlsCompiler } from "../middleware/controls/ControlsCompiler";
import { CSS3DCompiler } from "../middleware/css3D/CSS3DCompiler";
import { GeometryCompiler } from "../middleware/geometry/GeometryCompiler";
import { GroupCompiler } from "../middleware/group/GroupCompiler";
import { LightCompiler } from "../middleware/light/LightCompiler";
import { LineCompiler } from "../middleware/line/LineCompiler";
import { MaterialCompiler } from "../middleware/material/MaterialCompiler";
import { MeshCompiler } from "../middleware/mesh/MeshCompiler";
import { PassCompiler } from "../middleware/pass/PassCompiler";
import { PointsCompiler } from "../middleware/points/PointsCompiler";
import { RendererCompiler } from "../middleware/renderer/RendererCompiler";
import { SceneCompiler } from "../middleware/scene/SceneCompiler";
import { SpriteCompiler } from "../middleware/sprite/SpriteCompiler";
import { TextureCompiler } from "../middleware/texture/TextureCompiler";
export interface CompilerManagerParameters {
    cameraCompiler: CameraCompiler;
    lightCompiler: LightCompiler;
    geometryCompiler: GeometryCompiler;
    textureCompiler: TextureCompiler;
    materialCompiler: MaterialCompiler;
    rendererCompiler: RendererCompiler;
    sceneCompiler: SceneCompiler;
    controlsCompiler: ControlsCompiler;
    spriteCompiler: SpriteCompiler;
    lineCompiler: LineCompiler;
    meshCompiler: MeshCompiler;
    pointsCompiler: PointsCompiler;
    groupCompiler: GroupCompiler;
    passCompiler: PassCompiler;
    animationCompiler: AnimationCompiler;
    css3DCompiler: CSS3DCompiler;
}
export declare class CompilerManager {
    private cameraCompiler;
    private lightCompiler;
    private geometryCompiler;
    private textureCompiler;
    private materialCompiler;
    private rendererCompiler;
    private sceneCompiler;
    private controlsCompiler;
    private spriteCompiler;
    private lineCompiler;
    private meshCompiler;
    private pointsCompiler;
    private groupCompiler;
    private css3DCompiler;
    private passCompiler;
    private animationCompiler;
    private compilerMap;
    constructor(parameters?: CompilerManagerParameters);
    /**
     * engine?????????????????????
     * @param engine EngineSupport
     * @returns this
     */
    support(engine: EngineSupport): this;
    /**
     * ?????????three?????????vid??????
     * @param object three object
     * @returns vid or null
     */
    getObjectSymbol<O extends Object3D>(object: O): SymbolConfig["vid"] | null;
    /**
     * ??????vid?????????????????????three??????
     * @param vid vid??????
     * @returns three object || null
     */
    getObjectBySymbol(vid: string): any | null;
    /**
     * ??????vid??????object3D??????
     * @param vid ??????vid??????
     * @returns Object3D | null
     */
    getObject3D<O extends Object3D>(vid: string): O | null;
    getGeometry<G extends BufferGeometry>(vid: string): G | null;
    getMaterial<M extends Material>(vid: string): M | null;
    getTexture<T extends Texture>(vid: string): T | null;
    dispose(): this;
}

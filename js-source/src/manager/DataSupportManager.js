import { DataSupport } from "./../core/DataSupport";
import { TextureDataSupport } from "../middleware/texture/TextureDataSupport";
import { MaterialDataSupport } from "../middleware/material/MaterialDataSupport";
import { LightDataSupport } from "../middleware/light/LightDataSupport";
import { GeometryDataSupport } from "../middleware/geometry/GeometryDataSupport";
import { CameraDataSupport } from "../middleware/camera/CameraDataSupport";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { RendererDataSupport } from "../middleware/renderer/RendererDataSupport";
import { SceneDataSupport } from "../middleware/scene/SceneDataSupport";
import { ControlsDataSupport } from "../middleware/controls/ControlsDataSupport";
import { SpriteDataSupport } from "../middleware/sprite/SpriteDataSupport";
import { LineDataSupport } from "../middleware/line/LineDataSupport";
import { MeshDataSupport } from "../middleware/mesh/MeshDataSupport";
import { PointsDataSupport } from "../middleware/points/PointsDataSupport";
import { GroupDataSupport } from "../middleware/group/GroupDataSupport";
import { stringify } from "../convenient/JSONHandler";
import { PassDataSupport } from "../middleware/pass/PassDataSupport";
import { getModule } from "../middleware/constants/CONFIGMODULE";
import { AnimationDataSupport } from "../middleware/animation/AnimationDataSupport";
import { CSS3DDataSupport } from "../middleware/css3D/CSS3DDataSupport";
export class DataSupportManager {
    cameraDataSupport = new CameraDataSupport();
    lightDataSupport = new LightDataSupport();
    geometryDataSupport = new GeometryDataSupport();
    textureDataSupport = new TextureDataSupport();
    materialDataSupport = new MaterialDataSupport();
    rendererDataSupport = new RendererDataSupport();
    sceneDataSupport = new SceneDataSupport();
    controlsDataSupport = new ControlsDataSupport();
    spriteDataSupport = new SpriteDataSupport();
    lineDataSupport = new LineDataSupport();
    meshDataSupport = new MeshDataSupport();
    pointsDataSupport = new PointsDataSupport();
    groupDataSupport = new GroupDataSupport();
    css3DDataSupport = new CSS3DDataSupport();
    passDataSupport = new PassDataSupport();
    animationDataSupport = new AnimationDataSupport();
    dataSupportMap;
    constructor(parameters) {
        if (parameters) {
            Object.keys(parameters).forEach((key) => {
                if (this[key] !== undefined) {
                    this[key] = parameters[key];
                }
            });
        }
        const dataSupportMap = new Map();
        Object.keys(this).forEach((key) => {
            const dataSupport = this[key];
            if (dataSupport instanceof DataSupport) {
                dataSupportMap.set(dataSupport.MODULE, dataSupport);
            }
        });
        this.dataSupportMap = dataSupportMap;
    }
    /**
     * ?????????????????????????????????
     * @param type MODULETYPE
     * @returns DataSupport
     */
    getDataSupport(type) {
        if (this.dataSupportMap.has(type)) {
            return this.dataSupportMap.get(type);
        }
        else {
            console.warn(`can not found this type in dataSupportManager: ${type}`);
            return null;
        }
    }
    /**
     * @experimental ??????????????????????????????????????????
     */
    getSupportData(type) {
        if (this.dataSupportMap.has(type)) {
            return this.dataSupportMap.get(type).getData();
        }
        else {
            console.warn(`can not found this type in dataSupportManager: ${type}`);
            return null;
        }
    }
    /**
     * @experimental ??????????????????????????????????????????
     */
    setSupportData(type, data) {
        if (this.dataSupportMap.has(type)) {
            this.dataSupportMap.get(type).setData(data);
        }
        else {
            console.warn(`can not found this type in dataSupportManager: ${type}`);
        }
        return this;
    }
    /**
     * ??????vid??????????????????????????????
     * @param vid vid??????
     * @returns config || null
     */
    getConfigBySymbol(vid) {
        const dataSupportList = this.dataSupportMap.values();
        for (const dataSupport of dataSupportList) {
            const config = dataSupport.getConfig(vid);
            if (config) {
                return config;
            }
        }
        return null;
    }
    /**
     * ??????vid??????????????????????????????
     * @param vid ...vid??????
     * @returns this
     */
    removeConfigBySymbol(...vids) {
        const dataSupportList = this.dataSupportMap.values();
        for (const vid of vids) {
            for (const dataSupport of dataSupportList) {
                if (dataSupport.existSymbol(vid)) {
                    dataSupport.removeConfig(vid);
                    break;
                }
            }
        }
        return this;
    }
    /**
     * ??????vid????????????????????????????????????
     * @param vid vid??????
     * @returns MODULETYPE || null
     */
    getModuleBySymbol(vid) {
        const dataSupportList = this.dataSupportMap.values();
        for (const dataSupport of dataSupportList) {
            if (dataSupport.existSymbol(vid)) {
                return dataSupport.MODULE;
            }
        }
        return null;
    }
    /**
     * ??????????????????
     * @param config vis??????????????????
     * @returns this
     */
    applyConfig(...configs) {
        for (const config of configs) {
            const module = getModule(config.type);
            if (module) {
                this.dataSupportMap.get(module).addConfig(config);
            }
            else {
                console.warn(`dataSupportManager can not found this config module: ${config.type}`);
            }
        }
        return this;
    }
    /**
     * ???????????????????????????
     * @param config vis??????????????????
     * @returns config
     */
    reactiveConfig(config) {
        const module = getModule(config.type);
        if (module) {
            return this.dataSupportMap
                .get(module)
                .addConfig(config)
                .getConfig(config.vid);
        }
        else {
            console.warn(`dataSupportManager can not found this config module: ${config.type}`);
            return config;
        }
    }
    /**
     * ???????????????????????????
     * @param config ??????vis??????????????????????????????
     * @returns this
     */
    load(config) {
        const dataSupportMap = this.dataSupportMap;
        dataSupportMap.forEach((dataSupport, module) => {
            config[module] && dataSupport.load(config[module]);
        });
        return this;
    }
    /**
     * ?????????????????????????????????
     * @param config  ??????vis??????????????????????????????
     * @returns this
     */
    remove(config) {
        const dataSupportMap = this.dataSupportMap;
        dataSupportMap.forEach((dataSupport, module) => {
            config[module] && dataSupport.remove(config[module]);
        });
        return this;
    }
    /**
     * ??????JSON???????????????
     * @param extendsConfig ????????????JSON???????????????????????????dataSupport???????????????
     * @param compress ????????????????????? default true
     * @returns JSON string
     */
    toJSON(extendsConfig = {}, compress = true) {
        return JSON.stringify(this.exportConfig(extendsConfig, compress), stringify);
    }
    /**
     * ???????????????
     * @param extendsConfig ??????????????????
     * @param compress ????????????????????? default true
     * @returns LoadOptions
     */
    exportConfig(extendsConfig = {}, compress = true) {
        const dataSupportMap = this.dataSupportMap;
        dataSupportMap.forEach((dataSupport, module) => {
            extendsConfig[module] = dataSupport.exportConfig(compress);
        });
        return extendsConfig;
    }
}
//# sourceMappingURL=DataSupportManager.js.map
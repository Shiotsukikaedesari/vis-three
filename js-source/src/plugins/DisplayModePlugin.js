import { AmbientLight, DirectionalLight, Light, Line, LineBasicMaterial, Mesh, MeshLambertMaterial, Points, PointsMaterial, Sprite, SpriteMaterial, Texture, } from "three";
export var DISPLAYMODE;
(function (DISPLAYMODE) {
    // WIREWFRAME = 'wireframe',
    DISPLAYMODE["GEOMETRY"] = "geometry";
    DISPLAYMODE["MATERIAL"] = "material";
    DISPLAYMODE["LIGHT"] = "light";
    DISPLAYMODE["ENV"] = "env";
})(DISPLAYMODE || (DISPLAYMODE = {}));
export const DisplayModelPlugin = function (params = {}) {
    if (!this.webGLRenderer) {
        console.error("must install some renderer before DisplayModel plugin.");
        return false;
    }
    if (!this.scene) {
        console.error("must install some scene before DisplayModel plugin.");
        return false;
    }
    !params.overrideColor && (params.overrideColor = "rgb(250, 250, 250)");
    // 默认环境光
    !params.defaultAmbientLightSetting &&
        (params.defaultAmbientLightSetting = {});
    !params.defaultAmbientLightSetting.color &&
        (params.defaultAmbientLightSetting.color = "rgb(255, 255, 255)");
    !params.defaultAmbientLightSetting.intensity &&
        (params.defaultAmbientLightSetting.intensity = 0.5);
    const defaultAmbientLight = new AmbientLight(params.defaultAmbientLightSetting.color, params.defaultAmbientLightSetting.intensity);
    defaultAmbientLight.matrixAutoUpdate = false;
    // 默认平行光
    !params.defaultDirectionalLightSetting &&
        (params.defaultDirectionalLightSetting = {});
    !params.defaultDirectionalLightSetting.color &&
        (params.defaultDirectionalLightSetting.color = "rgb(255, 255, 255)");
    !params.defaultDirectionalLightSetting.intensity &&
        (params.defaultDirectionalLightSetting.intensity = 0.5);
    !params.defaultDirectionalLightSetting.position &&
        (params.defaultDirectionalLightSetting.position = {
            x: -100,
            y: 100,
            z: 100,
        });
    const defaultDirectionalLight = new DirectionalLight(params.defaultDirectionalLightSetting.color, params.defaultDirectionalLightSetting.intensity);
    defaultDirectionalLight.castShadow = false;
    defaultDirectionalLight.position.set(params.defaultDirectionalLightSetting.position.x, params.defaultDirectionalLightSetting.position.y, params.defaultDirectionalLightSetting.position.z);
    defaultDirectionalLight.updateMatrix();
    defaultDirectionalLight.updateMatrixWorld();
    defaultDirectionalLight.matrixAutoUpdate = false;
    !params.mode && (params.mode = DISPLAYMODE.ENV);
    this.displayMode = params.mode;
    const meshOverrideMaterial = new MeshLambertMaterial({
        color: params.overrideColor,
    });
    const lineOverrideMaterial = new LineBasicMaterial({
        color: params.overrideColor,
    });
    const pointsOverrideMaterial = new PointsMaterial({
        color: params.overrideColor,
        size: 5,
        sizeAttenuation: false,
    });
    const spriteOverrideMaterial = new SpriteMaterial({
        color: params.overrideColor,
    });
    const materialCacheMap = new WeakMap();
    const lightSet = new Set();
    const meshSet = new Set();
    const lineSet = new Set();
    const pointsSet = new Set();
    const spriteSet = new Set();
    let backgroundCache;
    let environmentCache;
    const filterTypeMap = {
        Object3D: true,
        Group: true,
    };
    this.scene.addEventListener("afterAdd", (event) => {
        const displayMode = this.displayMode;
        const objects = event.objects;
        for (const elem of objects) {
            if (filterTypeMap[elem.type]) {
                continue;
            }
            // 根据模式动态适应
            if (elem instanceof Mesh && elem.type === "Mesh") {
                meshSet.add(elem);
                if (displayMode === DISPLAYMODE.GEOMETRY) {
                    materialCacheMap.set(elem, elem.material);
                    elem.material = meshOverrideMaterial;
                }
            }
            else if (elem instanceof Line && elem.type.includes("Line")) {
                lineSet.add(elem);
                if (displayMode === DISPLAYMODE.GEOMETRY) {
                    materialCacheMap.set(elem, elem.material);
                    elem.material = lineOverrideMaterial;
                }
            }
            else if (elem instanceof Light && elem.type.includes("Light")) {
                if (elem === defaultAmbientLight || elem === defaultDirectionalLight) {
                    continue;
                }
                if (!lightSet.has(elem)) {
                    lightSet.add(elem);
                }
                if (displayMode !== DISPLAYMODE.ENV &&
                    displayMode !== DISPLAYMODE.LIGHT) {
                    this.scene.remove(elem);
                }
            }
            else if (elem instanceof Points && elem.type === "Points") {
                pointsSet.add(elem);
                if (displayMode === DISPLAYMODE.GEOMETRY) {
                    materialCacheMap.set(elem, elem.material);
                    elem.material = pointsOverrideMaterial;
                }
            }
            else if (elem instanceof Sprite && elem.type === "Sprite") {
                spriteSet.add(elem);
                if (displayMode === DISPLAYMODE.GEOMETRY) {
                    materialCacheMap.set(elem, elem.material);
                    elem.material = spriteOverrideMaterial;
                }
            }
        }
    });
    this.scene.addEventListener("afterRemove", (event) => {
        const objects = event.objects;
        for (const elem of objects) {
            if (filterTypeMap[elem.type]) {
                continue;
            }
            // 根据模式动态适应
            if (elem instanceof Mesh && elem.type === "Mesh") {
                meshSet.delete(elem);
                materialCacheMap.has(elem) && materialCacheMap.delete(elem);
            }
            else if (elem instanceof Line && elem.type.includes("Line")) {
                lineSet.delete(elem);
                materialCacheMap.has(elem) && materialCacheMap.delete(elem);
            }
            else if (elem instanceof Light && elem.type.includes("Light")) {
                if (elem === defaultAmbientLight || elem === defaultDirectionalLight) {
                    continue;
                }
                lightSet.delete(elem);
            }
            else if (elem instanceof Points && elem.type === "Points") {
                pointsSet.delete(elem);
                materialCacheMap.has(elem) && materialCacheMap.delete(elem);
            }
            else if (elem instanceof Sprite && elem.type === "Sprite") {
                spriteSet.delete(elem);
                materialCacheMap.has(elem) && materialCacheMap.delete(elem);
            }
        }
    });
    // 过滤材质
    const filterMaterial = () => {
        for (const mesh of meshSet) {
            if (mesh.material === meshOverrideMaterial) {
                continue;
            }
            materialCacheMap.set(mesh, mesh.material);
            mesh.material = meshOverrideMaterial;
        }
        for (const line of lineSet) {
            if (line.material === lineOverrideMaterial) {
                continue;
            }
            materialCacheMap.set(line, line.material);
            line.material = lineOverrideMaterial;
        }
        for (const points of pointsSet) {
            if (points.material === pointsOverrideMaterial) {
                continue;
            }
            materialCacheMap.set(points, points.material);
            points.material = pointsOverrideMaterial;
        }
        for (const sprite of spriteSet) {
            if (sprite.material === spriteOverrideMaterial) {
                continue;
            }
            materialCacheMap.set(sprite, sprite.material);
            sprite.material = spriteOverrideMaterial;
        }
    };
    // 还原材质
    const reduceMaterial = () => {
        meshSet.forEach((mesh) => {
            if (materialCacheMap.has(mesh)) {
                mesh.material = materialCacheMap.get(mesh);
                materialCacheMap.delete(mesh);
            }
        });
        lineSet.forEach((line) => {
            if (materialCacheMap.has(line)) {
                line.material = materialCacheMap.get(line);
                materialCacheMap.delete(line);
            }
        });
        pointsSet.forEach((points) => {
            if (materialCacheMap.has(points)) {
                points.material = materialCacheMap.get(points);
                materialCacheMap.delete(points);
            }
        });
        spriteSet.forEach((sprite) => {
            if (materialCacheMap.has(sprite)) {
                sprite.material = materialCacheMap.get(sprite);
                materialCacheMap.delete(sprite);
            }
        });
    };
    // 过滤灯光
    // TODO: 监听记录light.visible的值
    const filterLight = () => {
        lightSet.forEach((light) => {
            light.visible = false;
        });
        this.scene.add(defaultAmbientLight);
        this.scene.add(defaultDirectionalLight);
    };
    // 还原灯光
    const reduceLight = () => {
        lightSet.forEach((light) => {
            light.visible = true;
        });
        this.scene.remove(defaultAmbientLight);
        this.scene.remove(defaultDirectionalLight);
    };
    // 过滤场景设置
    const filterScene = () => {
        if (this.scene.background instanceof Texture) {
            backgroundCache = this.scene.background;
            this.scene.background = null;
        }
        if (this.scene.environment instanceof Texture) {
            environmentCache = this.scene.environment;
            this.scene.environment = null;
        }
    };
    // 还原场景
    const reduceScene = () => {
        if (backgroundCache) {
            this.scene.background = backgroundCache;
            backgroundCache = undefined;
        }
        if (environmentCache) {
            this.scene.environment = environmentCache;
            environmentCache = undefined;
        }
    };
    this.setDisplayMode = function (mode) {
        this.displayMode = mode || DISPLAYMODE.ENV;
        if (mode === DISPLAYMODE.GEOMETRY) {
            filterMaterial();
            filterScene();
            filterLight();
        }
        else if (mode === DISPLAYMODE.MATERIAL) {
            reduceMaterial();
            filterScene();
            filterLight();
        }
        else if (mode === DISPLAYMODE.LIGHT) {
            reduceMaterial();
            filterScene();
            reduceLight();
        }
        else if (mode === DISPLAYMODE.ENV) {
            reduceMaterial();
            reduceScene();
            reduceLight();
        }
        else {
            console.warn(`displayMode plugin can not set this mode: ${mode}`);
        }
        return this;
    };
    this.completeSet.add(() => {
        if (this.objectHelperManager) {
            this.objectHelperManager.addFilteredObject(defaultDirectionalLight);
        }
    });
    return true;
};
//# sourceMappingURL=DisplayModePlugin.js.map
import { Camera, Scene, Vector2 } from "three";
import { defineProcessor } from "../../../core/Processor";
import { SelectiveBloomPass } from "../../../extends/pass/SelectiveBloomPass";
import { CONFIGTYPE } from "../../constants/configType";
export default defineProcessor({
    configType: CONFIGTYPE.SELECTIVEBLOOMPASS,
    commands: {
        add: {
            selectedObjects({ target, engine, value }) {
                const object = engine.compilerManager.getObject3D(value);
                if (object) {
                    target.selectedObjects.push(object);
                }
                else {
                    console.warn(`selectiveBloomPassProcessor: can not found vid in engine: ${value}`);
                }
            },
        },
        set: {
            renderScene({ target, engine, value }) {
                const object = engine.compilerManager.getObject3D(value);
                if (object instanceof Scene) {
                    target.renderScene = object;
                }
                else {
                    `selectiveBloomPassProcessor: can not set renderScene in engine: ${value}`;
                }
            },
            renderCamera({ target, engine, value }) {
                const object = engine.compilerManager.getObject3D(value);
                if (object instanceof Camera) {
                    target.renderCamera = object;
                }
                else {
                    `selectiveBloomPassProcessor: can not set renderCamera in engine: ${value}`;
                }
            },
        },
        delete: {
            selectedObjects({ target, engine, value }) {
                const object = engine.compilerManager.getObject3D(value);
                if (object) {
                    if (target.selectedObjects.includes(object)) {
                        target.selectedObjects.splice(target.selectedObjects.indexOf(object), 1);
                    }
                }
                else {
                    console.warn(`selectiveBloomPassProcessor: can not found vid in engine: ${value}`);
                }
            },
        },
    },
    create(config, engine) {
        const objects = [];
        for (const vid of config.selectedObjects) {
            const object = engine.compilerManager.getObject3D(vid);
            object && objects.push(object);
        }
        const pass = new SelectiveBloomPass(new Vector2(config.resolution.x, config.resolution.y), config.strength, config.radius, config.threshold, (config.renderScene &&
            engine.compilerManager.getObject3D(config.renderScene)) ||
            undefined, (config.renderCamera &&
            engine.compilerManager.getObject3D(config.renderCamera)) ||
            undefined, objects);
        return pass;
    },
    dispose(target) {
        target.dispose();
    },
});
//# sourceMappingURL=SelectiveBloomPassProcessor.js.map
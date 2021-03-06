import { emptyHandler, } from "../../core/Processor";
import { EventLibrary } from "../../library/event/EventLibrary";
import { EVENTNAME } from "../../manager/EventManager";
import { syncObject } from "../../utils/utils";
const objectCacheMap = new WeakMap();
// 物体的lookAt方法
export const lookAtHandler = function ({ target, config, value, engine }) {
    // 不能自己看自己
    if (config.vid === value) {
        console.warn(`can not set object lookAt itself.`);
        return;
    }
    let cacheData = objectCacheMap.get(target);
    if (!cacheData) {
        cacheData = { lookAtTarget: null, updateMatrixWorldFun: null };
        objectCacheMap.set(target, cacheData);
    }
    if (!value) {
        if (!cacheData.updateMatrixWorldFun) {
            return;
        }
        target.updateMatrixWorld = cacheData.updateMatrixWorldFun;
        cacheData.lookAtTarget = null;
        cacheData.updateMatrixWorldFun = null;
        return;
    }
    const lookAtTarget = engine.compilerManager.getObject3D(value);
    if (!lookAtTarget) {
        console.warn(`lookAt handler can not found this vid mapping object: '${value}'`);
        return;
    }
    const updateMatrixWorldFun = target.updateMatrixWorld;
    cacheData.updateMatrixWorldFun = updateMatrixWorldFun;
    cacheData.lookAtTarget = lookAtTarget.position;
    target.updateMatrixWorld = (focus) => {
        updateMatrixWorldFun.call(target, focus);
        target.lookAt(cacheData.lookAtTarget);
    };
};
const eventSymbol = "vis.event";
// 添加事件
export const addEventHanlder = function ({ target, path, value, engine }) {
    const eventName = path[0];
    if (!EventLibrary.has(value.name)) {
        console.warn(`EventLibrary: can not support this event: ${value.name}`);
        return;
    }
    // 生成函数
    const fun = EventLibrary.generateEvent(value, engine);
    // 映射缓存
    const symbol = Symbol.for(eventSymbol);
    value[symbol] = fun;
    // 绑定事件
    target.addEventListener(eventName, fun);
};
// 移除事件
export const removeEventHandler = function ({ target, path, value }) {
    const eventName = path[0];
    const fun = value[Symbol.for(eventSymbol)];
    if (!fun) {
        console.warn(`event remove can not fun found event in config`, value);
        return;
    }
    target.removeEventListener(eventName, fun);
    delete value[Symbol.for(eventSymbol)];
};
// 更新事件
export const updateEventHandler = function ({ target, config, path, engine }) {
    const eventName = path[0];
    const eventConfig = config[path[0]][path[1]];
    const fun = eventConfig[Symbol.for(eventSymbol)];
    if (!fun) {
        console.warn(`event remove can not fun found event in config`, eventConfig);
        return;
    }
    target.removeEventListener(eventName, fun);
    // 生成函数
    const newFun = EventLibrary.generateEvent(config, engine);
    // 映射缓存
    eventConfig[eventSymbol] = newFun;
    // 绑定事件
    target.addEventListener(eventName, newFun);
};
// 添加子项
export const addChildrenHanlder = function ({ target, config, value, engine }) {
    const childrenConfig = engine.getConfigBySymbol(value);
    if (!childrenConfig) {
        console.warn(` can not foud object config in engine: ${value}`);
        return;
    }
    // children如果有parent先从parent移除
    if (childrenConfig.parent && childrenConfig.parent !== config.vid) {
        const parentConfig = engine.getConfigBySymbol(childrenConfig.parent);
        if (!parentConfig) {
            console.warn(` can not foud object parent config in engine: ${childrenConfig.parent}`);
            return;
        }
        parentConfig.children.splice(parentConfig.children.indexOf(value), 1);
    }
    childrenConfig.parent = config.vid;
    const childrenObject = engine.compilerManager.getObject3D(value);
    if (!childrenObject) {
        console.warn(`can not found this vid in engine: ${value}.`);
        return;
    }
    target.add(childrenObject);
};
// 移除子项
export const removeChildrenHandler = function ({ target, config, value, engine }) {
    const childrenObject = engine.compilerManager.getObject3D(value);
    if (!childrenObject) {
        console.warn(`can not found this vid in engine: ${value}.`);
        return;
    }
    target.remove(childrenObject);
    // 更新children对象的parent
    const childrenConfig = engine.getConfigBySymbol(value);
    if (!childrenConfig) {
        console.warn(`can not found this vid in engine: ${value}.`);
        return;
    }
    childrenConfig.parent = "";
};
export const objectCreate = function (object, config, filter, engine) {
    const asyncFun = Promise.resolve();
    asyncFun.then(() => {
        // lookAt
        !filter.lookAt &&
            lookAtHandler({
                target: object,
                config,
                engine,
                value: config.lookAt,
            });
        // children
        config.children.forEach((vid) => {
            addChildrenHanlder({
                target: object,
                config,
                value: vid,
                engine,
            });
        });
        // event
        for (const eventName of Object.values(EVENTNAME)) {
            config[eventName].forEach((event, i) => {
                addEventHanlder({
                    target: object,
                    path: [eventName, i.toString()],
                    value: event,
                    engine,
                });
            });
        }
    });
    syncObject(config, object, {
        vid: true,
        type: true,
        lookAt: true,
        parent: true,
        children: true,
        pointerdown: true,
        pointermove: true,
        pointerup: true,
        pointerenter: true,
        pointerleave: true,
        click: true,
        dblclick: true,
        contextmenu: true,
        ...filter,
    });
    return object;
};
export const objectDispose = function (target) {
    // @ts-ignore
    target._listener = {};
};
export const objectCommands = {
    add: {
        pointerdown: addEventHanlder,
        pointerup: addEventHanlder,
        pointermove: addEventHanlder,
        pointerenter: addEventHanlder,
        pointerleave: addEventHanlder,
        click: addEventHanlder,
        dblclick: addEventHanlder,
        contextmenu: addEventHanlder,
        children: addChildrenHanlder,
    },
    set: {
        lookAt: lookAtHandler,
        pointerdown: updateEventHandler,
        pointerup: updateEventHandler,
        pointermove: updateEventHandler,
        pointerenter: updateEventHandler,
        pointerleave: updateEventHandler,
        click: updateEventHandler,
        dblclick: updateEventHandler,
        contextmenu: updateEventHandler,
        parent: emptyHandler,
        children: {
            $reg: [
                {
                    reg: new RegExp(".*"),
                    handler: addChildrenHanlder,
                },
            ],
        },
    },
    delete: {
        pointerdown: removeEventHandler,
        pointerup: removeEventHandler,
        pointermove: removeEventHandler,
        pointerenter: removeEventHandler,
        pointerleave: removeEventHandler,
        click: removeEventHandler,
        dblclick: removeEventHandler,
        contextmenu: removeEventHandler,
        children: removeChildrenHandler,
    },
};
//# sourceMappingURL=ObjectProcessor.js.map
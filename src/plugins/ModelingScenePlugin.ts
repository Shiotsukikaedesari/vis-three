import { generateConfig } from "../convenient/generateConfig";
import { Engine } from "../engine/Engine";
import { ModelingScene, ModelingSceneParameters, SCENEVIEWPOINT } from "../extends/ModelingScene/ModelingScene";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { EngineSupport } from "../middleware/engineSupport/EngineSupport";
import { SceneDataSupport } from "../middleware/scene/SceneDataSupport";
import { Plugin } from "./plugin";

export const ModelingScenePlugin: Plugin<ModelingSceneParameters> = function (this: Engine, params: ModelingSceneParameters): boolean {
  if (this.scene instanceof ModelingScene) {
    console.warn('this has installed modeling scene plugin.')
    return false
  }

  // 前置条件
  if (!this.webGLRenderer) {
    console.error('must install some renderer before this plugin.')
    return false
  }


  const scene = new ModelingScene(params)
  this.scene = scene

  this.render = () => {
    this.webGLRenderer!.render(scene, this.currentCamera!)
    return this
  }

  if (params.hasDefaultPerspectiveCamera) {
    const defaultPerspectiveCamera = scene.getDefaultPerspectiveCamera!()
    this.currentCamera = defaultPerspectiveCamera

    scene.addEventListener(`${SCENEVIEWPOINT.DEFAULT}ViewPoint`, e => {
      this.setCamera!(defaultPerspectiveCamera)
    })
  }

  if (params.hasDefaultOrthographicCamera) {
    const defaultOrthograpbicCamera = scene.getDefaultOrthographicCamera!()

    scene.addEventListener(`${SCENEVIEWPOINT.TOP}ViewPoint`, e => {
      this.setCamera!(defaultOrthograpbicCamera)
    })
    scene.addEventListener(`${SCENEVIEWPOINT.BOTTOM}ViewPoint`, e => {
      this.setCamera!(defaultOrthograpbicCamera)
    })
    scene.addEventListener(`${SCENEVIEWPOINT.RIGHT}ViewPoint`, e => {
      this.setCamera!(defaultOrthograpbicCamera)
    })
    scene.addEventListener(`${SCENEVIEWPOINT.LEFT}ViewPoint`, e => {
      this.setCamera!(defaultOrthograpbicCamera)
    })
    scene.addEventListener(`${SCENEVIEWPOINT.FRONT}ViewPoint`, e => {
      this.setCamera!(defaultOrthograpbicCamera)
    })
    scene.addEventListener(`${SCENEVIEWPOINT.BACK}ViewPoint`, e => {
      this.setCamera!(defaultOrthograpbicCamera)
    })
  }

  return true
}

export const ModelingSceneSupportPlugin: Plugin<ModelingSceneParameters> = function (this: EngineSupport, params: ModelingSceneParameters): boolean {
  if (ModelingScenePlugin.call(this, params)) {
    const dataSupport = this.dataSupportManager.getDataSupport<SceneDataSupport>(MODULETYPE.SCENE)!.getData()
    dataSupport.scene = generateConfig(CONFIGTYPE.SCENE)!
    return true
  } else {
    return false
  }
}
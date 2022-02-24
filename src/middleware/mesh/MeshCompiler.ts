import { BoxBufferGeometry, BufferGeometry, Material, Mesh, MeshBasicMaterial } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler, ObjectCompilerParameters, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { MeshConfig } from "./MeshConfig";

export interface MeshCompilerTarget extends ObjectCompilerTarget<MeshConfig> {
  [key: string]: MeshConfig
}

export interface MeshCompilerParameters extends ObjectCompilerParameters<MeshConfig ,MeshCompilerTarget> {}


export class MeshCompiler extends ObjectCompiler<MeshConfig, MeshCompilerTarget, Mesh> {

  COMPILER_NAME: string = MODULETYPE.MESH

  private replaceMaterial = new MeshBasicMaterial({color: 'rgb(150, 150, 150)'})
  private replaceGeometry = new BoxBufferGeometry(10, 10, 10)

  constructor (parameters?: MeshCompilerParameters) {
    super(parameters)
  }

  getReplaceMaterial (): Material {
    return this.replaceMaterial
  }

  getReplaceGeometry (): BufferGeometry {
    return this.replaceGeometry
  }

  add (vid: string, config: MeshConfig): this {
    const object = new Mesh(this.getGeometry(config.geometry), this.getMaterial(config.material))

    Compiler.applyConfig(config, object, {
      geometry: true,
      material: true,
      lookAt: true
    })

    this.map.set(vid, object)
    this.weakMap.set(object, vid)

    this.setLookAt(vid, config.lookAt)

    this.scene.add(object)
    return this
  }

  set (vid: string, path: string[], key: string, value: any): this {
    if (!this.map.has(vid)) {
      console.warn(`model compiler can not found this vid mapping object: '${vid}'`)
      return this
    }

    let mesh = this.map.get(vid)!

    if (key === 'lookAt') {
      return this.setLookAt(vid, value)
    }

    if (key === 'material') {
      mesh.material = this.getMaterial(value)
      return this
    }

    for (let key of path) {
      mesh = mesh[key]
    }

    mesh[key] = value

    return this
  }

  dispose (): this {
    super.dispose()
    this.replaceGeometry.dispose()
    this.replaceMaterial.dispose()
    return this
  }
}
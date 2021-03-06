import { MeshBasicMaterial } from "three";
import { defineProcessor } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { CONFIGTYPE } from "../../constants/configType";
import { MeshBasicMaterialConfig } from "../MaterialConfig";
import {
  colorSetHandler,
  commonMapRegCommand,
  commonNeedUpdatesRegCommand,
  create,
  dispose,
} from "./common";

export default defineProcessor<MeshBasicMaterialConfig, MeshBasicMaterial>({
  configType: CONFIGTYPE.MESHBASICMATERIAL,
  commands: {
    set: {
      color: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand],
    },
  },
  create: function (
    config: MeshBasicMaterialConfig,
    engine: EngineSupport
  ): MeshBasicMaterial {
    return create(new MeshBasicMaterial(), config, engine);
  },
  dispose,
});

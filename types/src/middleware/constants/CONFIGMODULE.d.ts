import { CONFIGTYPE } from "./configType";
import { MODULETYPE } from "./MODULETYPE";
/**
 * @deprecated - use getModule
 */
export declare const CONFIGMODULE: {
    ImageTexture: MODULETYPE;
    CubeTexture: MODULETYPE;
    CanvasTexture: MODULETYPE;
    VideoTexture: MODULETYPE;
    MeshBasicMaterial: MODULETYPE;
    MeshStandardMaterial: MODULETYPE;
    MeshPhongMaterial: MODULETYPE;
    SpriteMaterial: MODULETYPE;
    LineBasicMaterial: MODULETYPE;
    PointsMaterial: MODULETYPE;
    ShaderMaterial: MODULETYPE;
    AmbientLight: MODULETYPE;
    SpotLight: MODULETYPE;
    PointLight: MODULETYPE;
    DirectionalLight: MODULETYPE;
    BoxGeometry: MODULETYPE;
    SphereGeometry: MODULETYPE;
    LoadGeometry: MODULETYPE;
    CustomGeometry: MODULETYPE;
    PlaneGeometry: MODULETYPE;
    CircleGeometry: MODULETYPE;
    ConeGeometry: MODULETYPE;
    EdgesGeometry: MODULETYPE;
    CylinderGeometry: MODULETYPE;
    LineCurveGeometry: MODULETYPE;
    SplineCurveGeometry: MODULETYPE;
    CubicBezierCurveGeometry: MODULETYPE;
    QuadraticBezierCurveGeometry: MODULETYPE;
    LineTubeGeometry: MODULETYPE;
    SplineTubeGeometry: MODULETYPE;
    TorusGeometry: MODULETYPE;
    RingGeometry: MODULETYPE;
    LineShapeGeometry: MODULETYPE;
    Sprite: MODULETYPE;
    Line: MODULETYPE;
    Mesh: MODULETYPE;
    Points: MODULETYPE;
    Group: MODULETYPE;
    CSS3DObject: MODULETYPE;
    CSS3DSprite: MODULETYPE;
    CSS3DPlane: MODULETYPE;
    PerspectiveCamera: MODULETYPE;
    OrthographicCamera: MODULETYPE;
    WebGLRenderer: MODULETYPE;
    Scene: MODULETYPE;
    TransformControls: MODULETYPE;
    OrbitControls: MODULETYPE;
    SMAAPass: MODULETYPE;
    UnrealBloomPass: MODULETYPE;
    ScriptAnimation: MODULETYPE;
    KeyframeAnimation: MODULETYPE;
};
export declare const getModule: (type: CONFIGTYPE) => MODULETYPE | null;

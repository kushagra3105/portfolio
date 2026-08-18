import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        let modelUrl = "/models/character.glb";
        
        // Check if custom model exists (e.g. batman.glb)
        try {
          const res = await fetch("/models/batman.glb", { method: "HEAD" });
          if (res.ok) {
            modelUrl = "/models/batman.glb";
          }
        } catch {
          // fallback
        }

        const onModelLoaded = async (gltf: GLTF) => {
          const character = gltf.scene;
          await renderer.compileAsync(character, camera, scene);
          character.traverse((child: any) => {
            if (child.isMesh) {
              const mesh = child as THREE.Mesh;
              child.castShadow = true;
              child.receiveShadow = true;
              mesh.frustumCulled = true;
            }
          });
          resolve(gltf);
          setCharTimeline(character, camera);
          setAllTimeline();
          const footR = character.getObjectByName("footR");
          const footL = character.getObjectByName("footL");
          if (footR) footR.position.y = 3.36;
          if (footL) footL.position.y = 3.36;
          dracoLoader.dispose();
        };

        // Try direct GLB load first
        loader.load(
          modelUrl,
          onModelLoaded,
          undefined,
          async () => {
            // Fallback to decrypted character.enc if direct GLB fails
            try {
              const encryptedBlob = await decryptFile(
                "/models/character.enc",
                "Character3D#@"
              );
              const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));
              loader.load(blobUrl, onModelLoaded, undefined, (error) => {
                console.error("Error loading GLTF model:", error);
                reject(error);
              });
            } catch (decErr) {
              reject(decErr);
            }
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;

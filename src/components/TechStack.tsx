import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SkillItem {
  name: string;
  category: string;
  color: string;
  bg: string;
}

const SKILLS_DATA: SkillItem[] = [
  // Languages
  { name: "Python", category: "Language", color: "#387eb8", bg: "#122538" },
  { name: "Java", category: "Language", color: "#f89820", bg: "#362208" },
  { name: "SQL", category: "Language", color: "#00a4cc", bg: "#062b38" },
  { name: "JavaScript", category: "Language", color: "#f7df1e", bg: "#332e08" },

  // Frameworks & Libraries
  { name: "PyTorch", category: "Framework", color: "#ee4c2c", bg: "#33120b" },
  { name: "Scikit-Learn", category: "Library", color: "#f7931e", bg: "#331f08" },
  { name: "Flask", category: "Framework", color: "#00c7b7", bg: "#062b27" },
  { name: "Streamlit", category: "Framework", color: "#ff4b4b", bg: "#330e0e" },
  { name: "Pandas", category: "Library", color: "#8a5cf6", bg: "#1f1238" },
  { name: "NumPy", category: "Library", color: "#4d77cf", bg: "#101f44" },
  { name: "Matplotlib", category: "Library", color: "#118ab2", bg: "#08283a" },
  { name: "Seaborn", category: "Library", color: "#6366f1", bg: "#141a3d" },

  // Databases
  { name: "MySQL", category: "Database", color: "#00758f", bg: "#052636" },
  { name: "MongoDB", category: "Database", color: "#10b981", bg: "#073318" },

  // Tools & Platforms
  { name: "Git", category: "Tool", color: "#f05032", bg: "#36120b" },
  { name: "GitHub", category: "Platform", color: "#c481ff", bg: "#25123a" },
  { name: "VS Code", category: "Tool", color: "#007acc", bg: "#062b47" },
  { name: "Jupyter", category: "Platform", color: "#f37626", bg: "#361908" },

  // Core Competencies
  { name: "Machine Learning", category: "Core", color: "#c481ff", bg: "#271238" },
  { name: "Deep Learning", category: "Core", color: "#a855f7", bg: "#200f33" },
  { name: "Data Science", category: "Core", color: "#ec4899", bg: "#330e20" },
  { name: "Web Dev", category: "Core", color: "#06d6a0", bg: "#062e20" },
];

function createSkillTexture(skill: SkillItem): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background radial gradient
  const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 256);
  grad.addColorStop(0, skill.bg);
  grad.addColorStop(0.7, "#0c0814");
  grad.addColorStop(1, "#030206");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Outer glowing border ring
  ctx.save();
  ctx.beginPath();
  ctx.arc(256, 256, 222, 0, Math.PI * 2);
  ctx.strokeStyle = skill.color;
  ctx.lineWidth = 14;
  ctx.shadowColor = skill.color;
  ctx.shadowBlur = 28;
  ctx.stroke();
  ctx.restore();

  // Inner subtle accent ring
  ctx.beginPath();
  ctx.arc(256, 256, 202, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Category Badge Pill
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const catText = skill.category.toUpperCase();
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const textWidth = ctx.measureText(catText).width;

  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(256 - textWidth / 2 - 16, 136, textWidth + 32, 34, 17);
  } else {
    ctx.rect(256 - textWidth / 2 - 16, 136, textWidth + 32, 34);
  }
  ctx.fill();
  ctx.strokeStyle = skill.color;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = skill.color;
  ctx.fillText(catText, 256, 153);

  // Main Skill Name
  const name = skill.name;
  const isLong = name.length > 13;
  const fontSize = isLong ? 42 : name.length > 9 ? 50 : 58;
  ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 3;

  if (name.includes(" ")) {
    const words = name.split(" ");
    if (words.length === 2) {
      ctx.fillText(words[0], 256, 240);
      ctx.fillText(words[1], 256, 300);
    } else {
      ctx.fillText(name, 256, 260);
    }
  } else {
    ctx.fillText(name, 256, 260);
  }
  ctx.restore();

  // Bottom glowing accent dot
  ctx.save();
  ctx.beginPath();
  ctx.arc(256, 365, 8, 0, Math.PI * 2);
  ctx.fillStyle = skill.color;
  ctx.shadowColor = skill.color;
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = SKILLS_DATA.map((skill, index) => ({
  skill,
  scale: [0.8, 0.95, 0.85, 1, 0.9][index % 5],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const materials = useMemo(() => {
    return SKILLS_DATA.map((skill) => {
      const texture = createSkillTexture(skill);
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: skill.color,
        emissiveMap: texture,
        emissiveIntensity: 0.25,
        metalness: 0.35,
        roughness: 0.35,
        clearcoat: 0.4,
        clearcoatRoughness: 0.1,
      });
    });
  }, []);

  return (
    <div className="techstack" id="skills" ref={containerRef}>
      <h2> My Skills</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              scale={props.scale}
              material={materials[i % materials.length]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;

import { Suspense, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { Html, RoundedBox } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

function BadgeRig() {
  const band = useRef();
  const fixed = useRef();
  const joint1 = useRef();
  const joint2 = useRef();
  const joint3 = useRef();
  const card = useRef();
  const [dragged, setDragged] = useState(null);
  const { width, height } = useThree((state) => state.size);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(Array.from({ length: 4 }, () => new THREE.Vector3())), []);
  const vectors = useMemo(() => ({ point: new THREE.Vector3(), direction: new THREE.Vector3() }), []);

  useRopeJoint(fixed, joint1, [[0, 0, 0], [0, 0, 0], 0.85]);
  useRopeJoint(joint1, joint2, [[0, 0, 0], [0, 0, 0], 0.85]);
  useRopeJoint(joint2, joint3, [[0, 0, 0], [0, 0, 0], 0.85]);
  useSphericalJoint(joint3, card, [[0, 0, 0], [0, 1.42, 0]]);

  useFrame((state) => {
    if (dragged && card.current) {
      vectors.point.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      vectors.direction.copy(vectors.point).sub(state.camera.position).normalize();
      vectors.point.add(vectors.direction.multiplyScalar(state.camera.position.length()));
      [card, joint1, joint2, joint3].forEach((item) => item.current?.wakeUp());
      card.current.setNextKinematicTranslation({ x: vectors.point.x - dragged.x, y: vectors.point.y - dragged.y, z: vectors.point.z - dragged.z });
    }
    if (fixed.current && band.current && joint1.current && joint2.current && joint3.current && card.current) {
      curve.points[0].copy(joint3.current.translation());
      curve.points[1].copy(joint2.current.translation());
      curve.points[2].copy(joint1.current.translation());
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      const rotation = card.current.rotation();
      const velocity = card.current.angvel();
      card.current.setAngvel({ x: velocity.x, y: velocity.y - rotation.y * 0.22, z: velocity.z });
    }
  });

  const release = (event) => {
    event.target.releasePointerCapture(event.pointerId);
    setDragged(null);
    document.body.classList.remove('is-dragging-badge');
  };

  return <>
    <group position={[0, 4.2, 0]}>
      <RigidBody ref={fixed} type="fixed" />
      {[joint1, joint2, joint3].map((joint, index) => <RigidBody key={index} ref={joint} position={[0.7 * (index + 1), 0, 0]} colliders={false} linearDamping={2} angularDamping={2}><BallCollider args={[0.08]} /></RigidBody>)}
      <RigidBody ref={card} position={[2.7, -0.15, 0]} colliders={false} linearDamping={2.5} angularDamping={2.5} type={dragged ? 'kinematicPosition' : 'dynamic'}>
        <CuboidCollider args={[1.18, 1.42, 0.08]} />
        <RoundedBox args={[2.36, 2.84, 0.16]} radius={0.11} smoothness={5} castShadow
          onPointerDown={(event) => { event.stopPropagation(); event.target.setPointerCapture(event.pointerId); setDragged(new THREE.Vector3().copy(event.point).sub(vectors.point.copy(card.current.translation()))); document.body.classList.add('is-dragging-badge'); }}
          onPointerUp={release}>
          <meshStandardMaterial color="#d6ff63" roughness={0.38} metalness={0.08} />
          <Html transform position={[0, 0, 0.09]} distanceFactor={1.7} pointerEvents="none">
            <div className="badge-face"><div className="badge-face__top"><span>AS/26</span><span>PORTFOLIO</span></div><div className="badge-face__mark">A</div><div><strong>Avnish<br />Sinha</strong><span className="badge-face__role">Software engineer · Builder</span></div></div>
          </Html>
        </RoundedBox>
      </RigidBody>
    </group>
    <mesh ref={band}><meshLineGeometry /><meshLineMaterial color="#d6ff63" depthTest={false} resolution={[width, height]} lineWidth={0.65} /></mesh>
  </>;
}

export default function InteractiveBadge() {
  return <div className="badge-stage" aria-label="Interactive Avnish Sinha identity badge. Drag the badge to move it.">
    <Canvas camera={{ position: [0, 0, 12], fov: 27 }} dpr={[1, 1.5]} shadows>
      <ambientLight intensity={1.8} /><directionalLight position={[3, 4, 6]} intensity={2.2} castShadow />
      <Suspense fallback={null}><Physics gravity={[0, -36, 0]} timeStep={1 / 60} interpolate><BadgeRig /></Physics></Suspense>
    </Canvas>
    <span className="badge-stage__hint">Drag the badge <span aria-hidden="true">↗</span></span>
  </div>;
}

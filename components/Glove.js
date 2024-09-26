// components/Glove.js
import React, { useState } from "react";
import { useTexture } from "@react-three/drei";

const Glove = ({ textureUrl }) => {
  const [loading, setLoading] = useState(true);

  // Load texture from URL passed as prop
  const texture = useTexture(textureUrl, () => setLoading(false));

  if (loading) {
    return (
      <mesh>
        {/* Placeholder geometry while loading */}
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="lightgray" />
      </mesh>
    );
  }

  return (
    <mesh rotation={[0, 0.5, 0]} scale={1.5}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Glove;

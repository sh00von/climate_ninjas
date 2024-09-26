import React, { useState, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import PropTypes from 'prop-types';
import { Html } from '@react-three/drei';

const Glove = ({ textureUrl }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const globeRef = useRef(); // For controlling rotation

  // Load texture from URL passed as prop
  const texture = useTexture(
    textureUrl,
    () => setLoading(false),    // On load success
    () => setError(true)        // On load error
  );

  // Apply continuous rotation to the globe
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001; // Slow rotation on Y-axis
    }
  });

  if (error) {
    return (
      <mesh>
        {/* Fallback in case of texture loading error */}
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="red" />
        <Html center>
          <div style={{ color: 'white' }}>Failed to load texture</div>
        </Html>
      </mesh>
    );
  }

  if (loading) {
    return (
      <mesh>
        {/* Placeholder while texture is loading */}
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="lightgray" />
        <Html center>
          <div style={{ color: 'black' }}>Loading...</div>
        </Html>
      </mesh>
    );
  }

  return (
    <mesh ref={globeRef} rotation={[0, 0.5, 0]} scale={.8}>
      <sphereGeometry args={[1, 64, 64]} /> {/* Higher resolution sphere */}
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

// PropTypes for type checking
Glove.propTypes = {
  textureUrl: PropTypes.string.isRequired,
};

export default Glove;

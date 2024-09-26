import React, { useState, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import PropTypes from 'prop-types';
import { Html } from '@react-three/drei';
import { Loader, AlertTriangle } from 'lucide-react'; // Add icons for loading and error states

const Glove = ({ textureUrl, rotationSpeed = 0.001 }) => {
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
      globeRef.current.rotation.y += rotationSpeed; // Dynamic rotation speed
    }
  });

  if (error) {
    return (
      <mesh>
        {/* Fallback in case of texture loading error */}
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="red" />
        <Html center>
          <div style={{ color: 'white', textAlign: 'center' }}>
            <AlertTriangle className="w-8 h-8 mb-2" />
            <span>Failed to load texture</span>
          </div>
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
          <div style={{ color: 'black', textAlign: 'center' }}>
            <Loader className="animate-spin w-8 h-8 mb-2" />
            <span>Loading...</span>
          </div>
        </Html>
      </mesh>
    );
  }

  return (
    <mesh ref={globeRef} rotation={[0, 0.5, 0]} scale={0.8}>
      <sphereGeometry args={[1, 64, 64]} /> {/* Higher resolution sphere */}
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

// PropTypes for type checking
Glove.propTypes = {
  textureUrl: PropTypes.string.isRequired,
  rotationSpeed: PropTypes.number, // Optional prop for rotation speed
};

export default Glove;

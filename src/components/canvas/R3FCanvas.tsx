'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { ReactNode } from 'react'

interface R3FCanvasProps {
  children?: ReactNode
  className?: string
}

function DefaultScene() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#6366f1" />
    </mesh>
  )
}

export default function R3FCanvas({ children, className }: R3FCanvasProps) {
  return (
    <div className={`h-80 w-full rounded-lg overflow-hidden bg-zinc-900 ${className ?? ''}`}>
      <Canvas camera={{ position: [2, 2, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        {children ?? <DefaultScene />}
        <OrbitControls />
      </Canvas>
    </div>
  )
}

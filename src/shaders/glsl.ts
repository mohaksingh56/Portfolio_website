// Vertex shader for glowing wireframe effect
export const glowVertexShader = `
  uniform float time;
  uniform float amplitude;
  
  attribute float displacement;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    
    vec3 newPosition = position + normal * amplitude * sin(displacement + time * 2.0);
    vPosition = newPosition;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

// Fragment shader for glowing wireframe effect
export const glowFragmentShader = `
  uniform float time;
  uniform vec3 color;
  uniform float opacity;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
    vec3 glow = color * intensity;
    
    // Add pulsing effect
    float pulse = sin(time * 3.0) * 0.5 + 0.5;
    glow *= (0.8 + pulse * 0.4);
    
    gl_FragColor = vec4(glow, opacity * intensity);
  }
`;

// Vertex shader for particle system
export const particleVertexShader = `
  uniform float time;
  uniform float size;
  
  attribute float alpha;
  attribute vec3 customColor;
  
  varying float vAlpha;
  varying vec3 vColor;
  
  void main() {
    vAlpha = alpha;
    vColor = customColor;
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Fragment shader for particle system
export const particleFragmentShader = `
  uniform float time;
  
  varying float vAlpha;
  varying vec3 vColor;
  
  void main() {
    // Create circular particles
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    if (dist > 0.5) {
      discard;
    }
    
    // Add glow effect
    float intensity = 1.0 - dist * 2.0;
    intensity = pow(intensity, 2.0);
    
    // Add twinkling effect
    float twinkle = sin(time * 10.0 + gl_FragCoord.x * 0.1 + gl_FragCoord.y * 0.1) * 0.5 + 0.5;
    intensity *= (0.7 + twinkle * 0.3);
    
    gl_FragColor = vec4(vColor * intensity, vAlpha * intensity);
  }
`;

// Vertex shader for neural network visualization
export const neuralVertexShader = `
  uniform float time;
  uniform float nodeSize;
  
  attribute float activity;
  attribute vec3 nodeColor;
  
  varying float vActivity;
  varying vec3 vNodeColor;
  
  void main() {
    vActivity = activity;
    vNodeColor = nodeColor;
    
    vec3 pos = position;
    
    // Add slight movement based on activity
    pos += normal * activity * sin(time * 5.0) * 0.1;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    gl_PointSize = nodeSize * activity * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Fragment shader for neural network visualization
export const neuralFragmentShader = `
  uniform float time;
  
  varying float vActivity;
  varying vec3 vNodeColor;
  
  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    if (dist > 0.5) {
      discard;
    }
    
    // Create pulsing effect based on activity
    float pulse = sin(time * 8.0 + vActivity * 10.0) * 0.5 + 0.5;
    float intensity = (1.0 - dist * 2.0) * vActivity * (0.7 + pulse * 0.3);
    
    gl_FragColor = vec4(vNodeColor * intensity, intensity);
  }
`;

// Vertex shader for matrix rain effect
export const matrixVertexShader = `
  uniform float time;
  
  attribute float speed;
  attribute float offset;
  
  varying vec2 vUv;
  varying float vOpacity;
  
  void main() {
    vUv = uv;
    
    vec3 pos = position;
    
    // Animate falling effect
    float fall = mod(time * speed + offset, 2.0) - 1.0;
    pos.y += fall * 10.0;
    
    // Fade based on position
    vOpacity = 1.0 - abs(fall);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment shader for matrix rain effect
export const matrixFragmentShader = `
  uniform float time;
  uniform vec3 color;
  
  varying vec2 vUv;
  varying float vOpacity;
  
  void main() {
    // Create digital character effect
    vec2 grid = floor(vUv * 20.0);
    float pattern = mod(grid.x + grid.y + time * 10.0, 2.0);
    
    float intensity = pattern * vOpacity;
    
    gl_FragColor = vec4(color * intensity, intensity);
  }
`;

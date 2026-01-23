type PromptInput = {
  theme: string;
  style: string;
  quality: string;
  backgroundColor: string;
  backgroundTexture: string;
  frameColor: string;
};

export function buildPosterPrompt(input: PromptInput) {
  return `
Role: Expert Graphic Designer & Image Compositor
Task: Create a high-resolution vertical poster using the provided input images, maintaining a strict fixed layout.

1. Global Style Settings:
- Theme: ${input.theme}
- Visual Style: ${input.style}
- Lighting/Quality: ${input.quality}

2. Background Configuration:
- Color: ${input.backgroundColor}
- Texture: ${input.backgroundTexture}
- Decorations: Subtle watermark overlays fitting the theme.

3. Fixed Layout Composition (Do Not Alter):
Use three Polaroid-style frames with ${input.frameColor} borders.

Frame A:
- Content: [Input Image 1]
- Position: Center-Left
- Size: Large (~50%)
- Orientation: -10°

Frame B:
- Content: [Input Image 2]
- Position: Top-Right
- Size: Medium (~25%)
- Orientation: +15°
- Overlap Frame A

Frame C:
- Content: [Input Image 3]
- Position: Bottom-Right
- Size: Small (~15%)
- Orientation: +10°

4. Rendering Instructions:
- Soft realistic shadows
- Preserve aspect ratio
- Do not distort faces
`;
}

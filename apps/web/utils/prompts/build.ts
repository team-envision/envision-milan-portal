type PosterPromptInput = {
  theme: string;
  imageStyle: string;
  quality: string;
  backgroundColor: string;
  backgroundTexture: string;
  backgroundDecorations: string;
  frameColor: string;
  quoteText: string;
};

export function buildPosterPrompt(input: PosterPromptInput) {
  return `
Role: Expert Graphic Designer
Task: Create a PRINT-READY POSTER on a VERTICAL RECTANGULAR CANVAS.
ASPECT RATIO MUST BE 9:16 (PORTRAIT).
The output MUST be a tall rectangle — NEVER square, NEVER landscape.

Repeat: This is a POSTER, not a square image.

=====================================
1. CANVAS & FORMAT (ABSOLUTE)
=====================================
- Canvas shape: VERTICAL RECTANGLE
- Aspect ratio: 9:16 portrait
- Height must be significantly greater than width

=====================================
2. BACKGROUND (VARIABLE)
=====================================
- Background Color: ${input.backgroundColor}
- Texture: ${input.backgroundTexture}
- Decorations: ${input.backgroundDecorations}, edges only
- Subtle top & bottom vignette to emphasize vertical height

=====================================
3. FIXED TEXT & LOGO PLACEMENT
=====================================

TOP LEFT (BELOW TITLE):
- Vintage emblem logo: "150 Years of Vande Mataram"
- Charkha + Indian tricolor
- Heritage illustration style
- NO frame, NO border, NO modern effects

=====================================
4. IMAGE HANDLING RULES (CRITICAL)
=====================================
User-provided images MUST be used AS-IS.

STRICT RULES:
- DO NOT redraw images
- DO NOT alter faces, lighting, background, or composition
- DO NOT add AI-generated elements inside photos
- DO NOT extend images beyond their edges
- Treat images as REAL printed photographs

=====================================
5. FIXED IMAGE LAYOUT (POLAROID FRAMES)
=====================================
All images must be placed STRICTLY INSIDE realistic ${input.frameColor} Polaroid frames.

POLAROID CONSTRUCTION RULES:
- Each Polaroid has a solid outer frame
- Inside the frame is a clean white mat border
- The photograph is mounted INSIDE the mat window
- The image must be fully contained within the frame opening
- NO part of any image may cross, touch, or overflow the frame edges
- NO bleed, NO edge escape, NO cropped spill

Soft natural shadows only.

-------------------------
TOP RIGHT FRAME
-------------------------
- Frame B (Medium)
- Position: Top-right quadrant
- Contains: [Input Image 2] (unchanged, fully contained)
- Tilt: +15° clockwise
- Slightly overlaps the center frame below
- Overlap applies ONLY to frames, NEVER to images
- Center frame image must NOT be visible behind overlap

-------------------------
CENTER FRAME (FOCAL)
-------------------------
- Frame A (Largest)
- Position: Slightly left of vertical center
- Contains: [Input Image 1] (unchanged, fully contained)
- Tilt: -10° counter-clockwise
- Dominates the vertical height

-------------------------
BOTTOM RIGHT FRAME
-------------------------
- Frame C (Medium)
- Position: Bottom-right quadrant
- Contains: [Input Image 3] (unchanged, fully contained)
- Tilt: +15° clockwise
- Overlaps the center frame above
- Overlap applies ONLY to frames, NEVER to images

-------------------------
BOTTOM LEFT TEXT
-------------------------
- Quote text:
  "${input.quoteText}"
- Position: Bottom-left, parallel to bottom-right frame
- Font: Elegant cursive / handwritten
- Ink color: Dark brown

=====================================
6. DEPTH & REALISM
=====================================
- Subtle shadows under frames
- Paper texture visible
- Archival convocation album feel
- No digital UI look

=====================================
7. ABSOLUTE CONSTRAINTS (DO NOT BREAK)
=====================================
- ABSOLUTELY NO square or 1:1 outputs
- ABSOLUTELY NO image overflow beyond Polaroid frames
- ABSOLUTELY NO cropping or modifying user images
- NO mentions of frames or angles on or inside Polaroids.
- NO extra text beyond:
  • "150 Years of Vande Mataram"
  • User quote
- NO UI elements, labels, watermarks
`;
}

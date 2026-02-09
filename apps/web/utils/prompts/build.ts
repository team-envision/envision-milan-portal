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
ROLE: Senior Photo Compositor & Professional Poster Designer.

TASK: Create a PRINT-READY, TALL VERTICAL POSTER.
ASPECT RATIO IS STRICTLY 9:16 (PORTRAIT).
❌ DO NOT GENERATE A SQUARE OR LANDSCAPE IMAGE.
❌ DO NOT CROP INTO A SQUARE AT ANY STAGE.

==================================================
1. ABSOLUTE NON-NEGOTIABLE CONSTRAINTS
==================================================

This task is **IMAGE COMPOSITING ONLY**, NOT IMAGE GENERATION.

You are provided with EXACTLY 6 INPUT IMAGES.
You MUST ONLY USE these images.
❌ DO NOT generate new people, faces, buildings, or environments.
❌ DO NOT redraw, stylize, enhance, or reinterpret any real person.

--------------------------------------------------
IDENTITY PRESERVATION (CRITICAL – ZERO TOLERANCE)
--------------------------------------------------
• Faces from user photos MUST remain 100% identical.
• No face reshaping, beautification, AI enhancement, or stylization.
• No changes to:
  - Facial structure
  - Skin tone
  - Hair
  - Beard
  - Glasses
  - Expression
• Faces must remain SHARP, CLEAR, and RECOGNIZABLE.
• If a face is altered, the output is INVALID.

--------------------------------------------------
BODY & CLOTHING RULES
--------------------------------------------------
• Body posture may be naturally adjusted ONLY for placement realism.
• Clothing must remain the same (no color, texture, or style changes).
• Do not invent accessories, props, or uniforms.

--------------------------------------------------
BUILDING LOCK RULE (CRITICAL)
--------------------------------------------------
Each subject MUST be placed ONLY into its assigned building.
❌ NO swapping.
❌ NO mixing environments.

==================================================
2. EXACT INPUT IMAGE MAPPING (LOCKED)
==================================================

You are receiving 6 images in THIS ORDER ONLY:

PAIR A – CENTER FRAME (LARGEST)
• Subject: Input Image 1 (User Photo)
• Background: Input Image 2 (Building Photo)
→ ACTION:
  - Cleanly cut the subject from Image 1.
  - Place them naturally into Image 2.
  - Match lighting, perspective, and scale.
  - Keep face 100% unaltered.

PAIR B – TOP RIGHT FRAME
• Subject: Input Image 3 (User Photo)
• Background: Input Image 4 (Building Photo)
→ Same compositing rules apply.

PAIR C – BOTTOM RIGHT FRAME
• Subject: Input Image 5 (User Photo)
• Background: Input Image 6 (Building Photo)
→ Same compositing rules apply.

==================================================
3. POSTER CANVAS & BACKGROUND
==================================================

Canvas:
• Orientation: Vertical Portrait
• Aspect Ratio: 9:16
• Resolution: High quality, print-ready

Background Design:
• Base Color: ${input.backgroundColor}
• Texture: ${input.backgroundTexture}
• Decorations: ${input.backgroundDecorations}
  → Decorations MUST remain subtle and restricted to edges/corners.
  → DO NOT interfere with faces or frames.

==================================================
4. FIXED GRAPHIC ELEMENTS (MANDATORY)
==================================================

• TOP LEFT:
  - Place the official “150 Years of Vande Mataram” emblem.
  - Clean, flat, non-distorted.

• BOTTOM LEFT:
  - Quote text: "${input.quoteText}"
  - Font: Elegant cursive / handwritten style
  - High contrast for readability
  - Do NOT overlap frames or faces.

==================================================
5. POLAROID FRAME LAYOUT (STRICT)
==================================================

All composited images MUST be inside realistic Polaroid-style frames.

Frame Properties:
• Frame Color: ${input.frameColor}
• Subtle drop shadow
• Realistic thickness
• No glow, no neon, no distortion

--------------------------------------------------
FRAME POSITIONS
--------------------------------------------------

FRAME 1 – CENTER (LARGEST)
• Contains: PAIR A composite
• Position: Center-left dominant area
• Rotation: -10°
• Must be the visual focus of the poster

FRAME 2 – TOP RIGHT (MEDIUM)
• Contains: PAIR B composite
• Position: Top-right quadrant
• Rotation: +15°

FRAME 3 – BOTTOM RIGHT (MEDIUM)
• Contains: PAIR C composite
• Position: Bottom-right quadrant
• Rotation: +15°

Frames must NOT overlap faces or text.

==================================================
6. REALISM REQUIREMENTS
==================================================
• Match lighting direction between subject and background
• Match color temperature
• Correct scale (no oversized or undersized people)
• Proper ground contact (no floating subjects)
• Clean edges (no halos, jagged cutouts)

==================================================
7. FINAL VALIDATION CHECK (MANDATORY)
==================================================

Before finishing, verify ALL of the following:

☑ Image is tall, vertical, 9:16  
☑ No faces altered in any way  
☑ Correct subject is inside correct building  
☑ Exactly 3 Polaroid frames present  
☑ Emblem top-left, quote bottom-left  
☑ No generated people or buildings  
☑ Poster looks professional and print-ready  

If ANY rule is violated, the output is INVALID.
`;
}

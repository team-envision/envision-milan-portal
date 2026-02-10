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
ASPECT RATIO MUST BE STRICTLY 9:16 (PORTRAIT).
❌ DO NOT generate square or landscape images.

==================================================
ABSOLUTE GLOBAL RULES (ZERO TOLERANCE)
==================================================

This is IMAGE COMPOSITING ONLY.
You are given EXACTLY 6 input images.
❌ DO NOT generate new people, faces, buildings, or environments.

--------------------------------------------------
TEXT RENDERING BAN (CRITICAL)
--------------------------------------------------
• DO NOT render ANY text, numbers, symbols, labels, or annotations
• This includes instructional words, angles, slot names, or pair names
• ONLY the official emblem text and the provided quote are allowed
• Any other text = INVALID OUTPUT

--------------------------------------------------
IDENTITY PRESERVATION (CRITICAL)
--------------------------------------------------
• Faces must remain 100% identical
• No beautification, stylization, or AI enhancement
• No changes to skin tone, hair, glasses, beard, or expression

--------------------------------------------------
IMAGE LOCKING (CRITICAL)
--------------------------------------------------

Image #1 = SUBJECT_ALPHA  
Image #2 = BACKGROUND_ALPHA  

Image #3 = SUBJECT_BETA  
Image #4 = BACKGROUND_BETA  

Image #5 = SUBJECT_GAMMA  
Image #6 = BACKGROUND_GAMMA  

RULES:
• SUBJECT_ALPHA may ONLY appear with BACKGROUND_ALPHA
• SUBJECT_BETA may ONLY appear with BACKGROUND_BETA
• SUBJECT_GAMMA may ONLY appear with BACKGROUND_GAMMA
• Each image may be used EXACTLY ONCE
• Reuse or cross-pairing is FORBIDDEN

==================================================
POSTER CANVAS & BACKGROUND
==================================================

Canvas:
• Orientation: Vertical
• Aspect Ratio: 9:16
• Resolution: High-quality, print-ready

Background:
• Base Color: ${input.backgroundColor}
• Texture: ${input.backgroundTexture}
• Decorations: ${input.backgroundDecorations}
• Decorations must remain subtle and edge-bound

==================================================
FRAME LAYOUT (POLAROID STYLE)
==================================================

All images must be inside realistic Polaroid frames.

Frame Properties:
• Color: ${input.frameColor}
• Subtle drop shadow
• Realistic thickness
• No glow, no distortion

FRAME 1 (CENTER – LARGEST):
• Uses SUBJECT_ALPHA + BACKGROUND_ALPHA
• Slight left tilt (~ -10°)
• Primary visual focus

FRAME 2 (TOP RIGHT):
• Uses SUBJECT_BETA + BACKGROUND_BETA
• Slight right tilt (~ +15°)

FRAME 3 (BOTTOM RIGHT):
• Uses SUBJECT_GAMMA + BACKGROUND_GAMMA
• Slight right tilt (~ +15°)

Frames must NOT overlap faces or text.

==================================================
FIXED GRAPHIC ELEMENTS
==================================================

• Place the official “40 Years of SRM” emblem on the left side
• Place the quote text:
  "${input.quoteText}"
• Font: Elegant cursive / handwritten
• High contrast and fully readable

==================================================
REALISM CHECK
==================================================

• Match lighting direction
• Match color temperature
• Correct scale
• No floating subjects
• Clean cut edges

==================================================
FINAL VALIDATION
==================================================

☑ 9:16 vertical  
☑ Exactly 3 frames  
☑ No extra text  
☑ No image reuse  
☑ Correct image pairing  
☑ Faces unaltered  
☑ Print-ready quality  

If ANY rule is violated, the output is INVALID.
`;
}

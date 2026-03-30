# Design System Specification: The Industrial Architect

## 1. Overview & Creative North Star
This design system is built for ADK Co., LTD to project a sense of "Precision Engineering." Our Creative North Star is **The Industrial Architect**: a visual language that marries the cold, hard reliability of heavy industry with the sophisticated, airy precision of high-end architectural renderings.

We move beyond the "standard SaaS" look by rejecting rigid, boxed-in grids. Instead, we embrace **Intentional Asymmetry** and **Tonal Depth**. This system uses overlapping elements, oversized editorial typography, and varying surface weights to create a digital environment that feels constructed rather than just programmed. The goal is a high-tech, dependable experience that breathes through massive whitespace and authoritative color blocks.

---

## 2. Colors: The Depth of Industry
The color palette is anchored by a rich, authoritative blue that signals stability and technical expertise.

### Surface Hierarchy & The "No-Line" Rule
**The Golden Rule:** 1px solid borders are strictly prohibited for defining sections or containers. 
Structure is achieved through background shifts. By placing a `surface-container-low` (#f3f2ff) element against a standard `surface` (#faf8ff) background, we create a soft but undeniable boundary. 

*   **Nesting:** To define importance, use the tier system. A `surface-container-lowest` (#ffffff) card should sit atop a `surface-container-low` (#f3f2ff) section to create a natural, "lifted" feel.
*   **Signature Textures:** For Hero sections and high-impact CTAs, use a subtle linear gradient (135°) from `primary` (#00327d) to `primary_container` (#0047ab). This prevents the "flatness" of standard UI and adds a metallic, industrial soul.
*   **The "Glass & Gradient" Rule:** Use Glassmorphism for floating navigation or overlay cards. Use `surface_container_low` at 70% opacity with a `backdrop-blur` of 12px-16px to allow background colors to bleed through, ensuring the UI feels integrated and high-end.

---

## 3. Typography: Editorial Authority
We utilize **Plus Jakarta Sans** exclusively. It provides a clean, geometric foundation that feels modern and precise.

*   **Display Scale:** Use `display-lg` (3.5rem) for hero statements. These should be set with tight letter-spacing (-0.02em) to mimic premium editorial layouts.
*   **Technical Labels:** Use `label-md` (0.75rem) and `label-sm` (0.6875rem) for data points and technical specs. These should be all-caps with a slight letter-spacing increase (+0.05em) to convey a "schematic" feel.
*   **Hierarchy as Identity:** Pair `headline-lg` (2rem) titles with `body-lg` (1rem) lead paragraphs. The significant jump in scale creates a rhythmic, sophisticated flow that guides the user through complex industrial data without fatigue.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are often a crutch for poor layout. In this design system, we prioritize **Tonal Layering**.

*   **The Layering Principle:** Depth is "stacked."
    *   Level 0: `surface` (Base)
    *   Level 1: `surface-container-low` (Secondary content blocks)
    *   Level 2: `surface-container-highest` (Navigation or sidebar)
    *   Level 3: `surface-container-lowest` (Interactive cards/modals)
*   **Ambient Shadows:** When a float is required (e.g., a primary modal), use a shadow tinted with `on-surface` (#141a32) at 6% opacity with a 32px blur. It should look like an ambient occlusion shadow, not a "drop shadow."
*   **The Ghost Border:** If a boundary is required for accessibility in input fields, use `outline-variant` (#c3c6d5) at 20% opacity. Never use 100% opaque borders.

---

## 5. Components: Industrial Primitives

### Buttons
*   **Primary:** High-contrast `primary` (#00327d) with `on_primary` (#ffffff) text. Use `DEFAULT` (0.25rem) rounding for a sharp, technical look.
*   **Secondary:** `secondary_container` (#a2c1ff) background with `on_secondary_container` (#2d4e85) text.
*   **States:** On hover, primary buttons should shift to `primary_container` (#0047ab) with a subtle 4px vertical lift.

### Input Fields
*   **Style:** Use `surface_container_low` as the field background. No bottom line, no full border. Use a 2px `primary` left-accent bar that appears only during the `:focus` state.
*   **Typography:** Labels must be `label-md` in `on_surface_variant` (#434653).

### Cards & Lists
*   **Forbid Dividers:** Horizontal rules (HR tags) are banned. Separate list items using `spacing-4` (1rem) or by alternating background shades between `surface` and `surface_container_low`.
*   **Interaction:** Cards should utilize the "Glass & Gradient" rule on hover, increasing their background opacity slightly rather than changing color.

### Industrial Context Components
*   **Data Badges:** Small, high-contrast chips using `tertiary_container` (#005568) with `on_tertiary_container` (#00d0fa) for status indicators like "Active" or "Precision Lock."
*   **Status Gauges:** Use `surface_container_highest` as a track and `primary` for the progress fill, ensuring no rounded caps—keep the ends square for an industrial, measured feel.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical margins. If the left margin is `spacing-12`, try a `spacing-24` right margin for hero text to create a dynamic, editorial feel.
*   **Do** use `primary_fixed_dim` (#b1c5ff) for subtle background accents behind technical diagrams.
*   **Do** prioritize whitespace. If it feels "empty," you are likely on the right track for a premium experience.

### Don't:
*   **Don't** use pure black (#000000). Always use `on_surface` (#141a32) for deep text to maintain the navy-industrial tonal range.
*   **Don't** use `full` rounding (pills) for primary actions. Stick to `DEFAULT` (0.25rem) or `md` (0.375rem) to maintain a "hard-tooled" aesthetic.
*   **Don't** place text directly on complex images. Use a `surface_dim` overlay or a glassmorphic container to ensure `headline` readability remains authoritative.
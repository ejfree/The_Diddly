from PIL import Image, ImageDraw
import math

def circular_mask_crop(path, out_path, feather=3):
    """Detect the circular vignette already baked into the artwork (by finding
    where the flat background color transitions to art along the horizontal
    and vertical centerlines), then apply a clean geometric circular alpha
    mask. This avoids speckling from color-threshold flood fills catching
    grain/gradient noise inside the artwork itself.
    """
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    px = im.load()
    cx, cy = w // 2, h // 2
    bg = px[2, 2][:3]

    def is_bg(p, tol=10):
        return all(abs(p[i] - bg[i]) <= tol for i in range(3))

    # walk inward from each of the 4 cardinal directions to find the radius
    radii = []
    # left
    for x in range(0, cx):
        if not is_bg(px[x, cy][:3]):
            radii.append(cx - x)
            break
    # right
    for x in range(w - 1, cx, -1):
        if not is_bg(px[x, cy][:3]):
            radii.append(x - cx)
            break
    # top
    for y in range(0, cy):
        if not is_bg(px[cx, y][:3]):
            radii.append(cy - y)
            break
    # bottom
    for y in range(h - 1, cy, -1):
        if not is_bg(px[cx, y][:3]):
            radii.append(y - cy)
            break

    radius = max(radii) + 2  # small pad so we don't clip art
    print(f"{path}: detected center=({cx},{cy}) radius={radius} (samples={radii})")

    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=255)
    if feather > 0:
        from PIL import ImageFilter
        mask = mask.filter(ImageFilter.GaussianBlur(feather))

    im.putalpha(mask)
    im.save(out_path)
    print(f"Saved {out_path} ({w}x{h})")

circular_mask_crop("tokenalben.png", "../images/tokenalben.png")
circular_mask_crop("tokensolomon.png", "../images/tokensolomon.png")

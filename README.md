# TYL Visuals Portfolio Website

## Folder Structure for Images

Create the following folder structure in your project directory:

```
e:\tyl\
├── index.html
├── jewelry.html
├── clothing.html
├── architecture.html
├── styles.css
├── script.js
└── src/
    ├── jewelry/
    │   ├── category-jewelry.jpg
    │   ├── jewelry-ring-1.jpg
    │   ├── gold-bangles-1.jpg
    │   ├── gold-bangles-2.jpg
    │   ├── gold-choker-1.jpg
    │   ├── gold-choker-2.jpg
    │   ├── shell-earrings.jpg
    │   ├── shell-necklace.jpg
    │   ├── enamel-bangles-1.jpg
    │   ├── silver-cuff.jpg
    │   ├── floral-bangles.jpg
    │   ├── silver-set.jpg
    │   ├── gold-ring-1.jpg
    │   ├── diamond-ring-1.jpg
    │   ├── pearl-set.jpg
    │   ├── emerald-ring.jpg
    │   └── sapphire-set.jpg
    ├── clothing/
    │   ├── category-clothing.jpg
    │   ├── traditional-clothing-1.jpg
    │   └── [other clothing images]
    └── architecture/
        ├── category-architecture.jpg
        ├── modern-architecture-1.jpg
        └── [other architecture images]
```

## Image Requirements

### Jewelry Images (src/jewelry/)
- **Format**: JPG or PNG
- **Size**: 300x300px minimum (square format recommended)
- **Quality**: High resolution for web display
- **Naming**: Use descriptive names as shown above

### Category Images
- **Format**: JPG or PNG
- **Size**: 400x300px (landscape format)
- **Quality**: High resolution for category cards

### Carousel Images
- **Format**: JPG or PNG
- **Size**: 500x600px (portrait format)
- **Quality**: High resolution for hero carousel

## How to Add Your Images

1. Create the `src` folder in your project directory
2. Create subfolders: `jewelry`, `clothing`, `architecture`
3. Add your images to the respective folders with the exact filenames listed above
4. Ensure all images are optimized for web (compressed but high quality)

## Image Optimization Tips

- Use tools like TinyPNG or ImageOptim to compress images
- Keep file sizes under 500KB for web performance
- Use JPG for photographs, PNG for images with transparency
- Consider using WebP format for better compression (with fallbacks)

## Notes

- All image paths in the HTML files have been updated to use local `src/` folder
- The website will work with placeholder images if some files are missing
- You can add more images by following the same naming convention


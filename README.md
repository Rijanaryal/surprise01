# Pink Blush — Best Friend Birthday Experience

This version follows the reference video as separate full-screen pages, not one continuous scrolling page.
The heart-emoji PB mark appears on the welcome and invitation pages; a matching pink heart favicon appears in the browser tab.

## Pages and interactions
1. A short animated pink welcome, then the invitation page with retro camera/photo frame and YES / NO buttons.
2. NO page with the supplied pink cat image (`assets/file.png`), a glowing frame, and staggered decorations. BACK returns to invitation.
3. Password keypad. The code is `2065`.
4. Cat delivers a letter; the envelope floats and shakes. Click it to open.
5. A separately animated best-friend birthday letter.
6. Scrapbook page with nine photo frames and a final birthday message. Photos appear one by one from alternating directions. This page scrolls vertically because it is a photo scrapbook.

## Open in VS Code
1. Extract the ZIP.
2. Open the extracted `pink-blush-bestie` folder in VS Code.
3. Install the Live Server extension if needed.
4. Right-click `index.html` and select **Open with Live Server**.

## Add your own photos
The supplied photos are already wired into the invitation camera, the "Our Memory" heart frame, and all nine scrapbook cards. Their original files stay in `assets/`; no renaming or copying is needed. The memory frame and scrapbook photos reveal in sequence from alternating directions.

## Cat stickers
The supplied pink cat artwork appears on the NO page as `assets/file.png`. It matches `assets/Analysis output 1.png`.
A custom cat-with-letter illustration is included as `assets/cat-letter.svg` and floats on the letter-delivery page.

## Stack
HTML, custom CSS, Tailwind CSS (CDN), GSAP (CDN), Google Fonts (CDN).
Internet access is required for the CDN libraries/fonts.

## Hosting
Deploy the extracted project folder using Netlify Drop: https://app.netlify.com/drop

## Password limitation
The `2065` code is in front-end JavaScript. It is only a playful surprise gate, not secure authentication. Do not put private information behind it.

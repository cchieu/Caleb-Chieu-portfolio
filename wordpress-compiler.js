import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const assetsDir = path.join(distDir, 'assets');

if (!fs.existsSync(distDir)) {
  console.error("Dist directory does not exist! Please run build first.");
  process.exit(1);
}

// 1. Dynamic Asset Lookup
const files = fs.readdirSync(assetsDir);
const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
const cssFile = files.find(f => f.startsWith('index-') && f.endsWith('.css'));

if (!jsFile || !cssFile) {
  console.error("Could not find compiled React assets in dist/assets!");
  process.exit(1);
}

console.log(`Found compiled JS: ${jsFile}`);
console.log(`Found compiled CSS: ${cssFile}`);

// 2. Initialize ZIP
const zip = new AdmZip();
const themeFolder = 'siliana-creative-theme/';

// 3. Create style.css Theme Header
const styleCssContent = `/*
Theme Name: Siliana Creative Portfolio Theme
Theme URI: https://calebchieu.site/
Author: Siliana
Author URI: https://calebchieu.site/
Description: Dynamic WordPress theme template based on Siliana's high-fidelity creative portfolio. Developed utilizing modern React, Vite, Framer Motion, and Tailwind CSS. Responsive, dynamic language switcher, custom theme colors, SVG micro-animations, and AI SEO integration.
Version: 1.0.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: siliana-theme
*/`;

zip.addFile(themeFolder + 'style.css', Buffer.from(styleCssContent, 'utf8'));

// 4. Create index.php
const indexPhpContent = `<?php
/**
 * Main Template file for Siliana Creative Portfolio Theme
 *
 * @package Siliana_Theme
 */
?>
<!doctype html>
<html <?php language_attributes(); ?> class="scroll-smooth">
  <head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary SEO Meta Tags -->
    <meta name="author" content="Siliana" />
    <meta name="application-name" content="Siliana Portfolio" />

    <!-- AI Scrapers, Chatbots & Search Engine Directives -->
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="google-extended" content="index" />
    <meta name="ai-agent-index" content="true" />
    
    <!-- OpenGraph Social Media Previews -->
    <meta property="og:type" content="profile" />
    <meta property="og:site_name" content="Siliana Portfolio" />

    <!-- Twitter Card previews -->
    <meta name="twitter:card" content="summary_large_image" />

    <?php wp_head(); ?>
  </head>
  <body <?php body_class('relative min-h-screen bg-brand-black text-brand-white selection:bg-brand-red selection:text-white'); ?>>
    <?php wp_body_open(); ?>

    <div class="noise-overlay" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 9999; opacity: 0.03; background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');" />

    <div id="root"></div>

    <?php wp_footer(); ?>
  </body>
</html>`;

zip.addFile(themeFolder + 'index.php', Buffer.from(indexPhpContent, 'utf8'));

// 5. Create functions.php with dynamic enqueuing and module capabilities
const functionsPhpContent = `<?php
/**
 * Siliana Theme functions and definitions.
 *
 * @package Siliana_Theme
 */

if ( ! function_exists( 'siliana_theme_setup' ) ) :
    function siliana_theme_setup() {
        // Let WordPress handle document title
        add_theme_support( 'title-tag' );
        
        // Add support for post thumbnails
        add_theme_support( 'post-thumbnails' );
        
        // HTML5 support
        add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
    }
endif;
add_action( 'after_setup_theme', 'siliana_theme_setup' );

function siliana_theme_scripts() {
    $js_file = 'assets/${jsFile}';
    $css_file = 'assets/${cssFile}';

    // Enqueue Compiled React CSS
    wp_enqueue_style(
        'siliana-react-css',
        get_template_directory_uri() . '/' . $css_file,
        array(),
        '1.0.0'
    );

    // Enqueue Compiled React Javascript as module
    wp_enqueue_script(
        'siliana-react-js',
        get_template_directory_uri() . '/' . $js_file,
        array(),
        '1.0.0',
        true
    );
}
add_action( 'wp_enqueue_scripts', 'siliana_theme_scripts' );

/**
 * Filter the script tag execution mode to set type="module" for ES React assets.
 */
function siliana_theme_script_type_module( $tag, $handle, $src ) {
    if ( 'siliana-react-js' !== $handle ) {
        return $tag;
    }
    return '<script type="module" src="' . esc_url( $src ) . '" id="' . esc_attr( $handle ) . '-js"></script>';
}
add_filter( 'script_loader_tag', 'siliana_theme_script_type_module', 10, 3 );
`;

zip.addFile(themeFolder + 'functions.php', Buffer.from(functionsPhpContent, 'utf8'));

// 6. Add Built assets
const sourceJsPath = path.join(assetsDir, jsFile);
const sourceCssPath = path.join(assetsDir, cssFile);

zip.addLocalFile(sourceJsPath, themeFolder + 'assets/');
zip.addLocalFile(sourceCssPath, themeFolder + 'assets/');

// 7. Write the final theme ZIP to both public and dist directories so it can be served
const outputZipName = 'siliana-theme.zip';
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}
zip.writeZip(path.join(publicDir, outputZipName));

const outputZipPath = path.join(distDir, outputZipName);
zip.writeZip(outputZipPath);

console.log('SUCCESS: WordPress theme package compiled and saved to public/' + outputZipName + ' & dist/' + outputZipName);

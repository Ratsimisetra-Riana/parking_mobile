const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../src/assets/logo.png');
const outBase = path.resolve(__dirname, '../android/app/src/main/res');

const sizes = [
    { folder: 'mipmap-mdpi', size: 48 },
    { folder: 'mipmap-hdpi', size: 72 },
    { folder: 'mipmap-xhdpi', size: 96 },
    { folder: 'mipmap-xxhdpi', size: 144 },
    { folder: 'mipmap-xxxhdpi', size: 192 },
];

(async () => {
    console.log('🚀 Génération des icônes Android...\n');
    console.log(`📁 Source: ${src}\n`);

    // Vérifier que le fichier source existe
    if (!fs.existsSync(src)) {
        console.error(`❌ Erreur: Le fichier source n'existe pas: ${src}`);
        process.exit(1);
    }

    for (const { folder, size } of sizes) {
        const outDir = path.join(outBase, folder);

        // Créer le dossier s'il n'existe pas
        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
        }

        // Générer ic_launcher.png
        const outFile = path.join(outDir, 'ic_launcher.png');
        await sharp(src)
            .resize(size, size, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .png()
            .toFile(outFile);
        console.log(`✅ ${folder}/ic_launcher.png (${size}×${size})`);

        // Générer ic_launcher_round.png (même image)
        const outFileRound = path.join(outDir, 'ic_launcher_round.png');
        await sharp(src)
            .resize(size, size, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .png()
            .toFile(outFileRound);
        console.log(`✅ ${folder}/ic_launcher_round.png (${size}×${size})`);
    }

    console.log('\n🎉 Toutes les icônes Android ont été générées avec succès !');
    console.log('\n📝 Prochaines étapes:');
    console.log('   1. Vérifiez les icônes dans android/app/src/main/res/mipmap-*/');
    console.log('   2. Lancez: cd android && .\\gradlew assembleDebug');
    console.log('   3. Testez l\'application sur un émulateur ou appareil');
})().catch(err => {
    console.error('❌ Erreur:', err.message);
    process.exit(1);
});

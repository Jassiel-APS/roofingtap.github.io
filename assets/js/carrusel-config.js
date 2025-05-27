// carrusel-config.js

export const carruselConfig = {
    proyectos: {
      defaultImages: [
        "./assets/images/content/3 MULTITECHO/IMG_4299.JPG",
        "./assets/images/content/10 TECHO CON TABLEROS LAMINADOS/TABLERO LAMINADO 1.jpg"
      ],
      dynamicFolder: "./assets/images/content/carousell/",
      useDynamic: true
    },
    destacados: {
      defaultImages: [
        "./assets/images/content/2 Cristal Templado/TECHO PERGOLADO CON CRISTAL TEMPLADO/TP Y CT 10.jpg",
        "./assets/images/content/3 MULTITECHO/MULTITECHO 5.jpg"
      ],
      dynamicFolder: "./assets/images/content/carousell/",
      useDynamic: true
    }
  };
  
  export function cargarImagenesDeCarpeta(folderPath) {
    console.log(`Cargando imágenes de: ${folderPath}`);
    if (folderPath.includes('carousell')) {
      return [
        "./assets/images/content/carousell/carrusell (1).jpeg",
        "./assets/images/content/carousell/carrusell (2).jpeg",
        "./assets/images/content/carousell/carrusell (3).jpeg",
        "./assets/images/content/carousell/carrusell (4).jpeg",
        "./assets/images/content/carousell/carrusell (5).jpeg",
        "./assets/images/content/carousell/carrusell (6).jpeg",
        "./assets/images/content/carousell/carrusell (7).jpeg",
        "./assets/images/content/carousell/carrusell (8).jpeg",
        "./assets/images/content/carousell/carrusell (9).jpeg",
        "./assets/images/content/carousell/carrusell (10).jpeg",
        "./assets/images/content/carousell/carrusell (11).jpeg",
        "./assets/images/content/carousell/carrusell (12).jpeg",
        "./assets/images/content/carousell/carrusell (13).jpeg",
        "./assets/images/content/carousell/carrusell (14).jpeg",
        "./assets/images/content/carousell/carrusell (15).jpeg",
        "./assets/images/content/carousell/carrusell (16).jpeg",
        "./assets/images/content/carousell/carrusell (17).jpeg",
        "./assets/images/content/carousell/carrusell (18).jpeg",
        "./assets/images/content/carousell/carrusell (19).jpeg",
        "./assets/images/content/carousell/carrusell (20).jpeg",
        "./assets/images/content/carousell/carrusell (21).jpeg",
        "./assets/images/content/carousell/carrusell (22).jpeg",
        "./assets/images/content/carousell/carrusell (23).jpeg",
        "./assets/images/content/carousell/carrusell (24).jpeg",
        "./assets/images/content/carousell/carrusell (25).jpeg",
        "./assets/images/content/carousell/carrusell (26).jpeg",
        "./assets/images/content/carousell/carrusell (27).jpeg",
        "./assets/images/content/carousell/carrusell (28).jpeg",
        "./assets/images/content/carousell/carrusell (29).jpeg",
        "./assets/images/content/carousell/carrusell (30).jpeg",
        "./assets/images/content/carousell/carrusell (31).jpeg",
      ];
    } else if (folderPath.includes('destacados')) {
      return [];
    }
    return [];
  }
  
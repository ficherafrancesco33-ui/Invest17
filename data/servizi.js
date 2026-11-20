// KEYSTONE — Servizi e attrattive per la sezione "Dove cercare" (posizioni indicative, 20/11/2026).
// Un comune prende l'etichetta se è entro il raggio indicato da uno di questi punti.
// [nome, lat, lon]
const SERVIZI = {
  raggio: { lago: 4, sci: 15, ospedale: 10, uni: 15, aziende: 10 },   // km
  lago: [
    ["Como", 45.81, 9.08], ["Cernobbio", 45.84, 9.07], ["Moltrasio", 45.86, 9.10], ["Laglio", 45.88, 9.14], ["Argegno", 45.94, 9.13], ["Lezzeno", 45.95, 9.19], ["Nesso", 45.91, 9.16],
    ["Tremezzo", 45.99, 9.22], ["Bellagio", 45.99, 9.26], ["Menaggio", 46.02, 9.24], ["Varenna", 46.01, 9.28], ["Bellano", 46.04, 9.30], ["Dervio", 46.08, 9.31], ["Dongo", 46.12, 9.28],
    ["Gravedona", 46.14, 9.30], ["Domaso", 46.15, 9.33], ["Colico", 46.13, 9.37], ["Mandello", 45.92, 9.32], ["Abbadia Lariana", 45.90, 9.33], ["Lecco", 45.85, 9.39], ["Oliveto Lario", 45.93, 9.29],
    ["Arona", 45.76, 8.56], ["Meina", 45.79, 8.54], ["Lesa", 45.83, 8.56], ["Belgirate", 45.84, 8.57], ["Stresa", 45.88, 8.53], ["Baveno", 45.91, 8.50], ["Verbania", 45.92, 8.55], ["Ghiffa", 45.96, 8.62],
    ["Oggebbio", 45.99, 8.65], ["Cannero", 46.02, 8.68], ["Cannobio", 46.06, 8.70], ["Maccagno", 46.04, 8.73], ["Luino", 46.00, 8.74], ["Porto Valtravaglia", 45.96, 8.68], ["Laveno", 45.91, 8.62],
    ["Ispra", 45.81, 8.61], ["Angera", 45.77, 8.58], ["Sesto Calende", 45.73, 8.63],
    ["Orta San Giulio", 45.80, 8.41], ["Omegna", 45.88, 8.41], ["Pella", 45.80, 8.38], ["Gozzano", 45.74, 8.44],
    ["Iseo", 45.66, 10.05], ["Sulzano", 45.69, 10.10], ["Marone", 45.74, 10.09], ["Pisogne", 45.81, 10.11], ["Lovere", 45.81, 10.07], ["Sarnico", 45.67, 9.96], ["Riva di Solto", 45.77, 10.04], ["Tavernola", 45.71, 10.04],
    ["Desenzano", 45.47, 10.54], ["Sirmione", 45.49, 10.61], ["Manerba", 45.55, 10.55], ["Salò", 45.60, 10.52], ["Gardone Riviera", 45.62, 10.56], ["Toscolano", 45.64, 10.61], ["Gargnano", 45.69, 10.66],
    ["Tignale", 45.74, 10.72], ["Limone", 45.81, 10.79], ["Riva del Garda", 45.88, 10.84], ["Torbole", 45.87, 10.87], ["Malcesine", 45.76, 10.81], ["Brenzone", 45.70, 10.77], ["Torri del Benaco", 45.61, 10.69],
    ["Garda", 45.58, 10.71], ["Bardolino", 45.55, 10.72], ["Lazise", 45.51, 10.73], ["Peschiera", 45.44, 10.69],
    ["Porlezza", 46.04, 9.13], ["Campione", 45.97, 8.97], ["Porto Ceresio", 45.91, 8.90], ["Lavena Ponte Tresa", 45.96, 8.87], ["Gavirate", 45.84, 8.72], ["Bosisio Parini", 45.80, 9.29], ["Annone", 45.81, 9.33],
    ["Lago d'Idro", 45.77, 10.51], ["Lago di Endine", 45.78, 9.94], ["Lago di Mergozzo", 45.96, 8.46], ["Lago di Varese", 45.80, 8.73], ["Lago di Pusiano", 45.80, 9.27],
  ],
  sci: [
    ["Livigno", 46.54, 10.14], ["Bormio", 46.47, 10.37], ["Santa Caterina Valfurva", 46.41, 10.50], ["Aprica", 46.15, 10.15], ["Madesimo", 46.43, 9.36], ["Chiesa in Valmalenco", 46.27, 9.85],
    ["Ponte di Legno - Tonale", 46.26, 10.51], ["Foppolo", 46.05, 9.76], ["Carona", 46.02, 9.78], ["Colere", 45.97, 10.08], ["Schilpario", 46.01, 10.16], ["Monte Pora (Castione)", 45.88, 10.02],
    ["Piani di Bobbio (Barzio)", 45.95, 9.47], ["Valtorta", 45.98, 9.53], ["Spiazzi di Gromo", 45.97, 9.90], ["Lizzola", 46.02, 10.07], ["Borno", 45.95, 10.20], ["Montecampione", 45.84, 10.24],
    ["Cervinia", 45.93, 7.63], ["Courmayeur", 45.79, 6.97], ["La Thuile", 45.71, 6.95], ["Pila", 45.70, 7.31], ["Champoluc", 45.83, 7.73], ["Gressoney", 45.83, 7.83], ["Alagna", 45.85, 7.94],
    ["Macugnaga", 45.97, 7.97], ["Domobianca", 46.10, 8.27], ["Bielmonte", 45.66, 8.11], ["Mottarone", 45.88, 8.46], ["Sestriere", 44.96, 6.88], ["Bardonecchia", 45.08, 6.70],
    ["Limone Piemonte", 44.20, 7.58], ["Prato Nevoso", 44.25, 7.79], ["Madonna di Campiglio", 46.23, 10.83], ["Folgarida", 46.30, 10.87], ["Andalo", 46.17, 11.00], ["Monte Bondone", 46.02, 11.04],
  ],
  ospedale: [
    ["Milano", 45.46, 9.19], ["Monza", 45.58, 9.27], ["Vimercate", 45.61, 9.37], ["Desio", 45.62, 9.21], ["Lecco", 45.85, 9.39], ["Merate", 45.70, 9.42], ["Como", 45.81, 9.08], ["Cantù", 45.74, 9.13],
    ["Erba", 45.81, 9.22], ["Menaggio", 46.02, 9.24], ["Gravedona", 46.14, 9.30], ["Varese", 45.82, 8.83], ["Busto Arsizio", 45.61, 8.85], ["Gallarate", 45.66, 8.79], ["Saronno", 45.63, 9.04],
    ["Legnano", 45.60, 8.91], ["Magenta", 45.47, 8.88], ["Abbiategrasso", 45.40, 8.92], ["Rho", 45.53, 9.04], ["Garbagnate", 45.58, 9.08], ["Vigevano", 45.32, 8.86], ["Pavia", 45.19, 9.16],
    ["Voghera", 44.99, 9.01], ["Lodi", 45.31, 9.50], ["Crema", 45.36, 9.68], ["Cremona", 45.13, 10.02], ["Bergamo", 45.69, 9.67], ["Seriate", 45.68, 9.72], ["Alzano Lombardo", 45.73, 9.73],
    ["Treviglio", 45.52, 9.59], ["San Giovanni Bianco", 45.87, 9.65], ["Piario", 45.90, 9.93], ["Lovere", 45.81, 10.07], ["Brescia", 45.54, 10.22], ["Chiari", 45.54, 9.93], ["Manerbio", 45.35, 10.14],
    ["Desenzano", 45.47, 10.54], ["Gavardo", 45.59, 10.44], ["Esine", 45.92, 10.25], ["Edolo", 46.18, 10.33], ["Sondrio", 46.17, 9.87], ["Sondalo", 46.33, 10.33], ["Chiavenna", 46.32, 9.40],
    ["Morbegno", 46.13, 9.57], ["Novara", 45.45, 8.62], ["Borgomanero", 45.70, 8.46], ["Verbania", 45.92, 8.55], ["Domodossola", 46.12, 8.29], ["Vercelli", 45.32, 8.42], ["Borgosesia", 45.72, 8.28],
    ["Biella", 45.56, 8.05], ["Alessandria", 44.91, 8.61], ["Casale Monferrato", 45.13, 8.45], ["Novi Ligure", 44.76, 8.79], ["Tortona", 44.89, 8.86], ["Acqui Terme", 44.68, 8.47], ["Asti", 44.90, 8.21],
    ["Torino", 45.07, 7.69], ["Aosta", 45.74, 7.32], ["Piacenza", 45.05, 9.69], ["Castel San Giovanni", 45.06, 9.43], ["Fiorenzuola", 44.93, 9.91], ["Genova", 44.41, 8.93], ["Rapallo", 44.35, 9.23],
    ["Lavagna", 44.31, 9.34], ["Savona", 44.30, 8.47], ["La Spezia", 44.10, 9.82], ["Sarzana", 44.11, 9.96], ["Verona", 45.44, 10.99], ["Bussolengo", 45.47, 10.85], ["Mantova", 45.16, 10.79],
    ["Trento", 46.07, 11.12], ["Rovereto", 45.89, 11.04], ["Riva del Garda", 45.88, 10.84], ["Parma", 44.80, 10.33],
  ],
  uni: [
    ["Milano", 45.46, 9.19], ["Pavia", 45.19, 9.16], ["Bergamo", 45.69, 9.67], ["Dalmine", 45.65, 9.60], ["Brescia", 45.54, 10.22], ["Varese", 45.82, 8.83], ["Como", 45.81, 9.08],
    ["Castellanza", 45.61, 8.90], ["Lecco", 45.85, 9.39], ["Novara", 45.45, 8.62], ["Vercelli", 45.32, 8.42], ["Alessandria", 44.91, 8.61], ["Torino", 45.07, 7.69], ["Genova", 44.41, 8.93],
    ["Piacenza", 45.05, 9.69], ["Cremona", 45.13, 10.02], ["Lodi", 45.31, 9.50], ["Verona", 45.44, 10.99], ["Trento", 46.07, 11.12], ["Parma", 44.80, 10.33], ["Mantova", 45.16, 10.79],
    ["Savona", 44.30, 8.47], ["La Spezia", 44.10, 9.82], ["Aosta", 45.74, 7.32], ["Biella", 45.56, 8.05], ["Asti", 44.90, 8.21],
  ],
  aziende: [
    ["Milano", 45.46, 9.19], ["Sesto San Giovanni", 45.54, 9.23], ["Agrate Brianza - Vimercate", 45.58, 9.35], ["Monza", 45.58, 9.27], ["Rho - Pero (Fiera)", 45.53, 9.06], ["San Donato - Rogoredo", 45.42, 9.26],
    ["Malpensa - Samarate", 45.63, 8.75], ["Vergiate - Sesto Calende", 45.72, 8.69], ["Busto Arsizio - Legnano", 45.61, 8.88], ["Varese", 45.82, 8.83], ["Saronno", 45.63, 9.04],
    ["Dalmine", 45.65, 9.60], ["Orio - Grassobbio", 45.67, 9.70], ["Bergamo", 45.69, 9.67], ["Treviglio", 45.52, 9.59], ["Brescia", 45.54, 10.22], ["Lumezzane", 45.65, 10.26], ["Rovato", 45.57, 9.99],
    ["Lecco", 45.85, 9.39], ["Como - Cantù", 45.76, 9.11], ["Lodi - Casalpusterlengo", 45.25, 9.62], ["Cremona", 45.13, 10.02], ["Crema", 45.36, 9.68], ["Pavia", 45.19, 9.16], ["Vigevano", 45.32, 8.86],
    ["Novara - Trecate", 45.44, 8.70], ["Vercelli", 45.32, 8.42], ["Biella", 45.56, 8.05], ["Ivrea", 45.47, 7.88], ["Torino", 45.07, 7.69], ["Alessandria", 44.91, 8.61], ["Valenza", 45.01, 8.64],
    ["Piacenza (logistica)", 45.05, 9.69], ["Castel San Giovanni (logistica)", 45.06, 9.43], ["Verona", 45.44, 10.99], ["Mantova", 45.16, 10.79], ["Genova", 44.41, 8.93],
  ],
};

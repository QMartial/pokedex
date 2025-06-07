export class Tools {
  static check_url(url: unknown): boolean {
    if (typeof url == "string") {
      if (url.startsWith("https")) {
        return true;
      }
    }
    return false;
  }
  static diviseur_plus_proche_de_racine(n: number): number {
    const racine = Math.ceil(Math.sqrt(n));
    let resultat = 0;
    for (let index = racine; index < 10; index++) {
      if (n % index == 0) {
        resultat = index;
        break;
      }
    }
    return resultat;
  }

  static isNotStringArray(arr: any[]): boolean {
    // Vérifie si tous les éléments du tableau sont des chaînes de caractères
    const allElementsAreStrings = arr.every(
      (element) => typeof element === "string"
    );

    // Retourne true si au moins un élément n'est pas une chaîne de caractères
    return !allElementsAreStrings;
  }
}

class CocktailDB {
    constructor() {}

    static getCocktailsByName(name) {
        return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    }

    static getCocktailsByFirstLetter(letter) {
        return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
    }

    static getSearchedByIngredient(ingrediant) {
        return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediant}`;
    }

    static getFilteredByCategory(category) {
        return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    }

    static getFilteredByGlass(glass) {
        return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`;
    }

    static getFilteredByAlcoholic() {
        return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`;
    }

    static getFilteredByNotAlcoholic() {
        return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`;
    }

    static getCocktailById(id) {
        return `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }

    static getRandomCocktail() {
        return `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
    }

    static getCategories() {
        return `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
    }

    static getGlasses() {
        return `https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list`;
    }

    static getIngredients() {
        return `https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`;
    }

    static getAlcoholicFilters() {
        return `https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list`;
    }
}

document.addEventListener("alpine:init", () => {
    Alpine.store("cocktailFilter", {
        name: Alpine.$persist(""),
        category: Alpine.$persist("-1"),
        ingredient: Alpine.$persist("-1"),
        glass: Alpine.$persist("-1"),
        async filter(
            name = this.name,
            category = this.category,
            ingredient = this.ingredient,
            glass = this.glass
        ) {
            this.name = name;
            this.category = category;
            this.ingredient = ingredient;
            this.glass = glass;

            category = await Alpine.store(
                "fetchedCocktailData"
            ).getSelectedCategory(category);
            category = category.replaceAll(" ", "_");

            ingredient = await Alpine.store(
                "fetchedCocktailData"
            ).getSelectedIngredient(ingredient);
            ingredient = ingredient.replaceAll(" ", "_");

            glass = await Alpine.store("fetchedCocktailData").getSelectedGlass(
                glass
            );
            glass = glass.replaceAll(" ", "_");

            let filteredArray = await Alpine.store(
                "fetchedCocktailData"
            ).getAllDrinks();

            if (category !== "-1") {
                filteredArray = await this.getFetchedFilteredData(
                    CocktailDB.getFilteredByCategory(category),
                    filteredArray
                );
            }
            if (ingredient !== "-1") {
                filteredArray = await this.getFetchedFilteredData(
                    CocktailDB.getSearchedByIngredient(ingredient),
                    filteredArray
                );
            }
            if (glass !== "-1") {
                filteredArray = await this.getFetchedFilteredData(
                    CocktailDB.getFilteredByGlass(glass),
                    filteredArray
                );
            }

            if (name) {
                filteredArray = filteredArray.filter((drink) =>
                    drink.strDrink.toLowerCase().includes(name.toLowerCase())
                );
            }

            window.dispatchEvent(
                new CustomEvent("change-cocktails", {
                    detail: {
                        data: {
                            cocktails: filteredArray,
                        },
                    },
                })
            );
        },
        async getFetchedFilteredData(link, filteredArray) {
            return await fetch(link)
                .then((response) => response.json())
                .then((response) => {
                    if (UtilityHelpers.isEmptyArray(filteredArray)) {
                        return response.drinks;
                    } else {
                        return filteredArray.filter((drink) =>
                            response.drinks.some(
                                (fetchedDrink) =>
                                    drink.idDrink === fetchedDrink.idDrink
                            )
                        );
                    }
                })
                .catch((e) => {
                    console.error(
                        "We encountered a problem with data. Try again!"
                    );
                });
        },
    });

    //fetches data and stores
    //data only resets after page reload
    Alpine.store("fetchedCocktailData", {
        categories: [],
        ingredients: [],
        glasses: [],
        allDrinks: [],
        async getCategories() {
            if (UtilityHelpers.isNotEmptyArray(this.categories)) {
                return this.categories;
            }
            await fetch(CocktailDB.getCategories())
                .then((response) => response.json())
                .then((response) => {
                    this.categories = response.drinks;
                });
            return this.categories;
        },
        async getIngredients() {
            if (UtilityHelpers.isNotEmptyArray(this.ingredients)) {
                return this.ingredients;
            }
            await fetch(CocktailDB.getIngredients())
                .then((response) => response.json())
                .then((response) => {
                    this.ingredients = response.drinks;
                });
            return this.ingredients;
        },
        async getGlasses() {
            if (UtilityHelpers.isNotEmptyArray(this.glasses)) {
                return this.glasses;
            }

            await fetch(CocktailDB.getGlasses())
                .then((response) => response.json())
                .then((response) => {
                    this.glasses = response.drinks;
                });

            return this.glasses;
        },
        async getAllDrinks() {
            if (UtilityHelpers.isNotEmptyArray(this.allDrinks)) {
                return this.allDrinks;
            }

            const retrievedCategories = await this.getCategories();

            const categoriesUrls = [];
            let dynamicUrl = "";

            for (const category of retrievedCategories) {
                dynamicUrl = CocktailDB.getFilteredByCategory(
                    category.strCategory.replaceAll(" ", "_")
                );
                categoriesUrls.push(dynamicUrl);
            }

            const categoriesPromises = categoriesUrls.map((url) =>
                fetch(url).then((response) => response.json())
            );
            const categoriesValues = await Promise.all(categoriesPromises);

            categoriesValues.forEach((value) => {
                this.allDrinks.push(...value.drinks);
            });

            return this.allDrinks;
        },
        async getSelectedCategory(selectedIndex) {
            if (selectedIndex === "-1") {
                return selectedIndex;
            }

            let retrievedCategories = await this.getCategories();
            return retrievedCategories[selectedIndex].strCategory;
        },
        async getSelectedIngredient(selectedIndex) {
            if (selectedIndex === "-1") {
                return selectedIndex;
            }

            let retrievedIngredients = await this.getIngredients();
            return retrievedIngredients[selectedIndex].strIngredient1;
        },
        async getSelectedGlass(selectedIndex) {
            if (selectedIndex === "-1") {
                return selectedIndex;
            }

            let retrievedGlasses = await this.getGlasses();
            return retrievedGlasses[selectedIndex].strGlass;
        },
    });
});

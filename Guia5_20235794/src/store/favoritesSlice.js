export const createFavoritesSlice = (set, get) => ({
    //estado inicial: una lista vacia de favoritos
    favorites: [],

    //funcion para verificar si una receta esta ya en favoritos
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink == id);
    },

    //maneja el click en el boton de favorito agregar o eliminar
    handleClickFavorite: (recipe) =>{
        if(get().favoriteExists(recipe.idDrink)){
            //si la receta ya esta en favoritos la elmininamos de la llista
            set((state) => ({
                favorites: state.favorites.filter(favorite =>favorite.idDrink != recipe.idDrink)
            }));
        } else {
            //si no esyta en favoritos, la agregamos
            set((state) =>({
                favorites: [...state.favorites, recipe]
            }));
        }

        //guardamos la lista actualizada de favoritosw en localstorage
        localStorage.setItem('favorite', JSON.stringify(get().favorites));
    },

    //carga la lista de favoritos desde localstorage al iniciar aplicacion
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites');
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            });
        }
    }
});
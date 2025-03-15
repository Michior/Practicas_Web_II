import { useNotification } from "./notificationsSlice";

export const createFavoritesSlice = (set, get) => ({
    //estado inicial: una lista vacia de favoritos
    favorites: [],

    //funcion para verificar si una receta esta ya en favoritos
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink == id);
    },

    //maneja el click en el boton de favorito agregar o eliminar
    handleClickFavorite: (recipe) =>{
        let message = "";

        if(get().favoriteExists(recipe.idDrink)){
            //si la receta ya esta en favoritos la elmininamos de la llista
            set((state) => ({
                favorites: state.favorites.filter(favorite =>favorite.idDrink != recipe.idDrink)
            }));
            message = `${recipe.strDrink} eliminado de favoritos`;
        } else {
            //si no esyta en favoritos, la agregamos
            set((state) =>({
                favorites: [...state.favorites, recipe]
            }));
            message = `${recipe.strDrink} agregado a favoritos`;
        }

        //guardamos la lista actualizada de favoritosw en localstorage
        localStorage.setItem('favorite', JSON.stringify(get().favorites));

        //Aca le agregamos la notificacion 
        useNotification.getState().addNotification(message);
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
/**
 * Nous avons également des méthodes pour récupérer les données du serveur. 
 * Dans le cas où nous accédons à des ressources protégées, la requête HTTP a besoin de 
 * l'en-tête Authorization.
 */

const authHeader = () => {

    const manager = JSON.parse(localStorage.getItem("manager"));
    if (manager && manager.accessToken) {
        return {
            "x-access-token": manager.accessToken
        }
    } else {
        return {}
    }
};


export default authHeader;
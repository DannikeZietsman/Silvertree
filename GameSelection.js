// games = [
//   {
//     "id": 1,
//     "title": "Hollow Knight",
//     "normalPrice": 14.99,
//     "salePrice": 7.49,
//     "store": "Steam"
//   },
//   {
//     "id": 2,
//     "title": "Stardew Valley",
//     "normalPrice": 13.99,
//     "salePrice": 13.99,
//     "store": "GOG"
//   },
//   {
//     "id": 3,
//     "title": "Celeste",
//     "normalPrice": 19.99,
//     "salePrice": 4.99,
//     "store": "Steam"
//   },
//   {
//     "id": 4,
//     "title": "Hades",
//     "normalPrice": 24.99,
//     "salePrice": 12.49,
//     "store": "Epic Games"
//   },
//   {
//     "id": 5,
//     "title": "Portal 2",
//     "normalPrice": 9.99,
//     "salePrice": 0.99,
//     "store": "Steam"
//   },
//   {
//     "id": 6,
//     "title": "Terraria",
//     "normalPrice": 9.99,
//     "salePrice": 9.99,
//     "store": "GOG"
//   },
//   {
//     "id": 7,
//     "title": "Disco Elysium",
//     "normalPrice": 39.99,
//     "salePrice": 9.99,
//     "store": "GOG"
//   },
//   {
//     "id": 8,
//     "title": "Cuphead",
//     "normalPrice": 19.99,
//     "salePrice": 14.99,
//     "store": "Steam"
//   }
// ]
let games = [];

const gameGrid = document.getElementById("gameGrid");

const priceFilter = document.getElementById("priceFilter");
const saleFilter = document.getElementById("saleFilter");
const resetFilters = document.getElementById("resetFilters");

async function loadGames() {

    try {
        const response = await fetch(
            "https://www.cheapshark.com/api/1.0/deals?pageSize=60"
        );

        if (!response.ok) {
            throw new Error("Could not fetch games");
        }

        const data = await response.json();

        games = data.map(game => ({
            id: game.gameID,
            title: game.title,
            normalPrice: Number(game.normalPrice),
            salePrice: Number(game.salePrice),
            storeID: game.storeID,
            dealID: game.dealID,
            savings: Number(game.savings),
            image: game.thumb
        }));

        displayGames(games);

    } catch (error) {
        console.error("Error loading games:", error);
    }
}

function displayGames(games) {
    gameGrid.innerHTML = "";

    games.forEach(game => {
        const card = document.createElement("div");
        card.classList.add("game-card");

        card.innerHTML = `
            <h3>${game.title}</h3>
            ${isOnSale(game) ? 
                `<p class='normal-price'>$${game.normalPrice.toFixed(2)}</p>`
                : ""}
            <p class='sale-price'>$${game.salePrice.toFixed(2)}</p>
            <p class='discount'>${isOnSale(game) ? discount(game).toFixed(0) + "% OFF" : ""}</p>
            `;

        gameGrid.appendChild(card);
    });
}

function filterGames() {

    const maxPrice = Number(priceFilter.value);
    const onlyOnSale = saleFilter.checked;

    const filteredGames = games.filter(game => {

        const matchesPrice = priceFilter.value === "" || game.salePrice <= maxPrice;

        const matchesSale = !onlyOnSale || game.salePrice < game.normalPrice;

        return matchesPrice && matchesSale;
    });

    displayGames(filteredGames);
}

priceFilter.addEventListener("input", filterGames);
saleFilter.addEventListener("change", filterGames);

resetFilters.addEventListener("click", () => {
    priceFilter.value = "";
    saleFilter.checked = false;

    filterGames();
});

function isOnSale(game) {
    return game.salePrice < game.normalPrice;
}

function find(name, games) {
    for (const game of games) {
        if (game.title === name) {
            return game
        }
    }
}

function discount(game) {
    return (game.normalPrice - game.salePrice) / game.normalPrice * 100;
}

function gamesOnSale(games) {
    return games.filter(isOnSale);
}

function platformGame(platform, games) {
    return games.filter(game => game.store === platform);
}

function findCheapest(games) {
    return games.reduce((cheapest, game) => {
        if (game.salePrice < cheapest.salePrice) {
            return game;
        }
        return cheapest;
    });
}

loadGames();
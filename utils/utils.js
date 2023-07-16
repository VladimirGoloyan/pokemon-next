export const baseUrls = {
    allPokemon: "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json",
    onePokemon: "https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/{0}.json",
    pokemonImage: "https://jherr-pokemon.s3.us-west-1.amazonaws.com/{0}"
}

export function formatString(format) {
    const args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/\{(\d+)\}/g, (m, i) => args[i]);
}

export const getAllPokemon = async () => {
    const resp = await fetch(baseUrls.allPokemon);
    return await resp.json();
}

export const getOnePokemon = async (id) => {
    const resp = await fetch(formatString(baseUrls.onePokemon,id));
    return await resp.json();
}

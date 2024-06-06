import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
export default function Home() {
  const [Pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  //Get data function from an api.
  const getPost = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_URL);
      const data = await res.json();
      setPokemons(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getPost();
  }, []);

  //Onchange for handling searched pokemon
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //Filtering pokemons on the basis of searched Pokemon.
  const filteredPokemons = Pokemons.filter((Pokemon) =>
    Pokemon.pokemon.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="flex flex-col items-center bg-[#FAF1E4] min-h-screen">
      <div className="py-4 border-b border-[#435334] bg-[#9EB384] w-full flex items-center justify-between px-10">
        <p className="font-bold">Pokemons Api App</p>
      </div>
      <div className="m-2 w-1/4">
        <input
          className="w-full p-2 border-2 border-[#435334] rounded focus:outline-[#435334] "
          type="text"
          placeholder="Search Pokemon"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <Grid className="flex flex-wrap w-full gap-y-5 py-4 lg:gap-x-0 gap-x-2 items-center justify-around ">
        {filteredPokemons.map((el) => {
          return (
            <div
              className="px-8 py-4 w-96 h-72 relative flex flex-col items-center text-center justify-center bg-[#CEDEBD] rounded-md"
              key={el.id}>
              <img src={el.image_url} alt="Pokemon" className="w-28 h-28" />
              <h3 className="text-[#435334] text-xl font-bold">{el.pokemon}</h3>
              <p className="text-[#435334] font-semibold">
                <span className="text-[#435334] text-lg font-bold">
                  Type of Pokemons:{" "}
                </span>
                {el.type}
              </p>
              <p className="text-[#435334] font-semibold">
                <span className="text-[#435334] text-lg font-bold">
                  Abilities:{" "}
                </span>
                {el.abilities.join(", ")}
              </p>
              <p className="text-[#435334] font-semibold">
                <span className="text-[#435334] text-lg font-bold">
                  Hitpoint:{" "}
                </span>
                {el.hitpoints}
              </p>
            </div>
          );
        })}
      </Grid>
    </div>
  );
}

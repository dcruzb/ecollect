import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("items").del()
      .then(async () => {
        // Inserts seed entries
        return await knex("items").insert([
            { title: "Lamps", image: "lamps.svg" },
            { title: "Batteries", image: "batteries.svg" },
            { title: "Papers and Cardboards", image: "papers-cardboards.svg" },
            { title: "Eletronic waste", image: "eletronic-waste.svg" },
            { title: "Organic waste", image: "organic-waste.svg" },
            { title: "Cooking oil", image: "cooking-oil.svg" }
        ]);
      });
};

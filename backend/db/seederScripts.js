const hoodieSeeders = () => {
  const seeder = [];
  const color = [
    { name: "antique_cherry_red", hex: "#7C0418" },
    { name: "antique_sapphire", hex: "#1C5674" },
    { name: "ash", hex: "#D8D8D8" },
    { name: "azalea", hex: "#F58AB5" },
    { name: "black", hex: "#1D2327" },
    { name: "cardinal_red", hex: "#6D1427" },
    { name: "carolina_blue", hex: "#799CDB" },
    { name: "charcoal", hex: "#5F6260" },
    { name: "cherry_red", hex: "#9B1127" },
    { name: "dark_chocolate", hex: "#351F1B" },
    { name: "dark_heather", hex: "#374248" },
    { name: "forest_green", hex: "#1F2D17" },
    { name: "garnet", hex: "#530612" },
    { name: "gold", hex: "#DE9D27" },
    { name: "graphite_heather", hex: "#808283" },
    { name: "sport_dark_green", hex: "#445B4F" },
    { name: "sport_dark_maroon", hex: "#63343D" },
    { name: "sport_dark_navy", hex: "#3E4453" },
    { name: "heather_sport_royal", hex: "#4D71B7" },
    { name: "heather_sport_scarlet", hex: "#4D71B7" },
    { name: "heliconia", hex: "#BA3572" },
    { name: "indigo_blue", hex: "#495A71" },
    { name: "irish_green", hex: "#328D48" },
    { name: "light_blue", hex: "#A1BFD9" },
    { name: "light_pink", hex: "#EFC4E0" },
    { name: "maroon", hex: "#4B1426" },
    { name: "military_green", hex: "#48553C" },
    { name: "mint_green", hex: "#B3CAB0" },
    { name: "navy", hex: "#323A4E" },
    { name: "old_gold", hex: "#BA9657" },
    { name: "orange", hex: "#E24D2B" },
    { name: "orchid", hex: "#C8B9D2" },
    { name: "purple", hex: "#34225A" },
    { name: "red", hex: "#B12A2E" },
    { name: "royal", hex: "#1B519A" },
    { name: "safety_green", hex: "#D2F721" },
    { name: "safety_orange", hex: "#F47F3B" },
    { name: "safety_pink", hex: "#F36CA4" },
    { name: "sand", hex: "#B9B2A4" },
    { name: "sapphire", hex: "#2D81A4" },
    { name: "sport_grey", hex: "#A09FA4" },
    { name: "violet", hex: "#7673A1" },
    { name: "white", hex: "#EEEEEE" },
  ];

  for (let i = 0; i < color.length; i++) {
    const name = color[i].name;

    const object = {
      productId: 3,
      img_url: `https://allutestbucket.s3.amazonaws.com/hoodie/Gildan_Sweatshirt_${name}.jpg`,
      description:
        "Basic shirt made of cotton. Soft-washed, garment-dyed fabric.",
      color: `${name}`,
    };

    seeder.push(object);
  }

  // console.log(seeder.length)
  return seeder;
};

const undoHoodie = async () => {
  const data = await hoodieSeeders()
  const undoId = []
  for(let i = 0; i < data.length; i++) {
    undoId.push(i+1)
  }

  // console.log(undoId)

  return undoId;
}




module.exports = { hoodieSeeders, undoHoodie };


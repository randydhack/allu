const productImageSeeders = () => {
  const seeder = [];
  const hoodieColor = [
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
    { name: "heather_sport_dark_green", hex: "#445B4F" },
    { name: "heather_sport_dark_maroon", hex: "#63343D" },
    { name: "heather_sport_dark_navy", hex: "#3E4453" },
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
  const heavyTColor = [
      { name: "banana", hex: "#F2EBA7" },
      { name: "bay", hex: "#859285" },
      { name: "berry", hex: "#714859" },
      { name: "black", hex: "#1D2327" },
      { name: "blossom", hex: "#F8BAC1" },
      { name: "blue_jean", hex: "#757C8A" },
      { name: "blue_spruce", hex: "#3A5651" },
      { name: "brick", hex: "#883E44" },
      { name: "bright_salmon", hex: "#F36150" },
      { name: "burnt_orange", hex: "#F4832E" },
      { name: "butter", hex: "#FAD575" },
      { name: "chalky_mint", hex: "#6BC3AE" },
      { name: "chambray", hex: "#B9E0EE" },
      { name: "chili", hex: "#943541" },
      { name: "china_blue", hex: "#2D3E56" },
      { name: "citrus", hex: "#F7C25B" },
      { name: "crimson", hex: "#C5545D" },
      { name: "crunchberry", hex: "#EB6684" },
      { name: "denim", hex: "#323A3E" },
      { name: "emerald", hex: "#26645D" },
      { name: "flo_blue", hex: "#4D6CA8" },
      { name: "granite", hex: "#4D6CA8" },
      { name: "graphite", hex: "#333431" },
      { name: "grey", hex: "#635D5A" },
      { name: "hemp", hex: "#393E2C" },
      { name: "ice_blue", hex: "#6A7D82" },
      { name: "island_reef", hex: "#9CE5C8" },
      { name: "ivory", hex: "#F7E9CE" },
      { name: "khaki", hex: "#777451" },
      { name: "lagoon", hex: "#47C0CE" },
      { name: "light_green", hex: "#689677" },
      { name: "melon", hex: "#F48660" },
      { name: "midnight", hex: "#2C3643" },
      { name: "moss", hex: "#40442F" },
      { name: "mustard", hex: "#D1B66B" },
      { name: "navy", hex: "#2D3142" },
      { name: "neon_pink", hex: "#F24997" },
      { name: "neon_red_orange", hex: "#F2555A" },
      { name: "orchid", hex: "#C8AAC9" },
      { name: "paprika", hex: "#EC2C4F" },
      { name: "pepper", hex: "#3E3735" },
      { name: "periwinkle", hex: "#5C6DA0" },
      { name: "red", hex: "#E20729" },
      { name: "royal_caribe", hex: "#2E82BB" },
      { name: "sandstone", hex: "#A49B82" },
      { name: "sapphire", hex: "#3CA4C3" },
      { name: "seafoam", hex: "#82B2AD" },
      { name: "true_navy", hex: "#10263A" },
      { name: "vineyard", hex: "#6A3D54" },
      { name: "violet", hex: "#7D7CBA" },
      { name: "washed_denim", hex: "#6B84A4" },
      { name: "watermelon", hex: "#F3585F" },
      { name: "white", hex: "#EEEEEE" },
      { name: "yam", hex: "#AD5931" },
  ];
  const lightTColor = [
    { name: "black_frost", hex: "#313332" },
    { name: "black", hex: "#1B1B19" },
    { name: "blush_frost", hex: "#C87572" },
    { name: "fuchsia_frost", hex: "#F0679C" },
    { name: "green_frost", hex: "#46CE82" },
    { name: "grey_frost", hex: "#959595" },
    { name: "heather_charcoal", hex: "#625D5F" },
    { name: "heathered_teal", hex: "#087C7C" },
    { name: "maritime_frost", hex: "#708CC0" },
    { name: "maroon_frost", hex: "#7C4248" },
    { name: "navy_frost", hex: "#536072" },
    { name: "new_navy", hex: "#303841" },
    { name: "purple_frost", hex: "#71639C" },
    { name: "red_frost", hex: "#C64F57" },
    { name: "royal_frost", hex: "#7595DC" },
    { name: "turquoise_frost", hex: "#39B3E8" },
  ];
  
  for (let i = 0; i < heavyTColor.length; i++) {
    const name = heavyTColor[i].name;

    const object = {
      productId: 1,
      img_url: `https://allutestbucket.s3.amazonaws.com/tshirt/comfort_colors_${name}.jpg`,
      description:
        "Heavy T-shirt",
      color: `${name}`,
    };

    seeder.push(object);
  }

  for (let i = 0; i < hoodieColor.length; i++) {
    const name = hoodieColor[i].name;

    const object = {
      productId: 2,
      img_url: `https://allutestbucket.s3.amazonaws.com/hoodie/Gildan_Sweatshirt_${name}.jpg`,
      description:
        "Hoodies",
      color: `${name}`,
    };

    seeder.push(object);
  }

  for (let i = 0; i < lightTColor.length; i++) {
    const name = lightTColor[i].name;

    const object = {
      productId: 3,
      img_url: `https://allutestbucket.s3.amazonaws.com/lighttshirt/District_Tee_${name}.jpg`,
      description:
        "Basic shirt made of cotton. Soft-washed, garment-dyed fabric.",
      color: `${name}`,
    };

    seeder.push(object);
  }

  return seeder;
};

const undoProductImages = async () => {
  const data = await productImageSeeders();
  const undoId = [];
  for (let i = 0; i < data.length; i++) {
    undoId.push(i + 1);
  }

  return undoId;
};

module.exports = { productImageSeeders, undoProductImages };

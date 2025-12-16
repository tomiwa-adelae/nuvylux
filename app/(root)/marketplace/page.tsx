import { ShopHeroSection } from "../_components/ShopHeroSection";
import { CuratedShop } from "../_components/CuratedShop";

const page = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <ShopHeroSection />
      <CuratedShop />
    </div>
  );
};

export default page;

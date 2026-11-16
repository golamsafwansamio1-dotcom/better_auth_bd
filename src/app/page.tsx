

import PriceTicker from "@/components/PriceTicker";
import Hero from "@/components/Hero";
import PriceUp from "@/components/PriceUp";
import PriceDown from "@/components/PriceDown";
import AllProducts from "@/components/AllProducts";


export default function Home() {
  return (
    <main>
     
      <PriceTicker />
      <Hero />
      <PriceUp />
      <PriceDown />
      <AllProducts />
      
    </main>
  );
}

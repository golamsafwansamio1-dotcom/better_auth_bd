
"use client";

import Marquee from "react-fast-marquee";

const priceUpdates = [
  { name: "চাল", emoji: "🍚", price: "৭০", unit: "কেজি", change: "+৫%", up: true },
  { name: "ডাল", emoji: "🥣", price: "১২০", unit: "কেজি", change: "-৩%", up: false },
  { name: "সয়াবিন তেল", emoji: "🫗", price: "১৭৫", unit: "লিটার", change: "+২%", up: true },
  { name: "আলু", emoji: "🥔", price: "৩৫", unit: "কেজি", change: "-৪%", up: false },
  { name: "পেঁয়াজ", emoji: "🧅", price: "৬০", unit: "কেজি", change: "+৩%", up: true },
  { name: "ডিম", emoji: "🥚", price: "১৪০", unit: "ডজন", change: "-২%", up: false },
];

export default function PriceTicker() {
  return (
    <section className="w-full overflow-hidden border-b border-green-100 bg-green-50">
      <div className="flex items-center gap-5 px-6 py-4">

        <div className="shrink-0 rounded-lg bg-green-700 px-4 py-3 font-bold text-white">
          আজকের বাজার
        </div>

        <div className="min-w-0 flex-1">
          <Marquee
            direction="left"
            speed={45}
            pauseOnHover={true}
            gradient={false}
            autoFill={true}
          >
            {priceUpdates.map((item) => (
              <div
                key={item.name}
                className="mx-5 flex shrink-0 items-center gap-2 whitespace-nowrap text-lg text-gray-800"
              >
                <span className="text-xl">{item.emoji}</span>

                <span>{item.name}</span>

                <strong className="font-bold">
                  ৳{item.price}/{item.unit}
                </strong>

                <span
                  className={
                    item.up
                      ? "font-bold text-red-600"
                      : "font-bold text-green-600"
                  }
                >
                  {item.up ? "▲" : "▼"} {item.change}
                </span>
              </div>
            ))}
          </Marquee>
        </div>

      </div>
    </section>
  );
}

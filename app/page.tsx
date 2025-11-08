'use client';
import Link from "next/link";

const presets = [
  { label: "Тихая", q: "noise=low" },
  { label: "Без материалов", q: "materials=none" },
  { label: "5–10 мин", q: "duration=5-10" },
  { label: "В машине", q: "place=car" },
  { label: "3–5 лет", q: "age=3-5" },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Сгенерируйте игру за 10 секунд</h1>
        <p className="text-gray-600">дома или в дороге — без регистрации</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {presets.map(p => (
            <Link key={p.label} href={`/generator?${p.q}`} className="px-3 py-2 rounded border hover:bg-gray-50">
              {p.label}
            </Link>
          ))}
        </div>
        <Link href="/generator" className="inline-block mt-4 px-4 py-2 rounded bg-black text-white">Открыть генератор</Link>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-3">Каталог игр</h2>
        <Link href="/games" className="text-blue-600 underline">Перейти в каталог</Link>
      </section>
    </div>
  );
}

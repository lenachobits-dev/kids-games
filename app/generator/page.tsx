'use client';
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
type Game = {
  id:string; slug:string; title:string; place:string;
  ages:{min:number,max:number}; duration:string; summary:string;
  materials:string[]; skills:string[]; noise:'low'|'medium'|'high';
};

async function loadGames(): Promise<Game[]> {
  const r = await fetch("/data/games.json", { cache: "no-cache" });
  return r.json();
}

export default function GeneratorPage() {
  const sp = useSearchParams();
  const [all, setAll] = useState<Game[]>([]);
  const [shown, setShown] = useState<string[]>([]);
  const [picked, setPicked] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  // простые фильтры из query
  const filters = useMemo(() => ({
    place: sp.get("place") || undefined,
    materials: sp.get("materials") || undefined,
    duration: sp.get("duration") || undefined,
    age: sp.get("age") || undefined, // формата 3-5
    noise: sp.get("noise") || undefined,
  }), [sp]);

  useEffect(() => { loadGames().then(g=>{ setAll(g); setLoading(false); }); }, []);

  const pool = useMemo(() => {
    let g = all;
    if (filters.place) g = g.filter(x=>x.place===filters.place);
    if (filters.materials) g = g.filter(x=>x.materials.includes(filters.materials!));
    if (filters.duration) g = g.filter(x=>x.duration===filters.duration);
    if (filters.noise) g = g.filter(x=>x.noise===filters.noise);
    if (filters.age) {
      const [a,b]=filters.age.split("-").map(Number);
      g = g.filter(x=>x.ages.min<=b && x.ages.max>=a);
    }
    return g.filter(x=>!shown.includes(x.id));
  }, [all, filters, shown]);

  function pick3() {
    const arr=[...pool];
    arr.sort(()=>Math.random()-0.5);
    const next = arr.slice(0,3);
    setPicked(next);
    setShown(prev=>[...prev, ...next.map(x=>x.id)]);
  }

  function reset() {
    setShown([]); setPicked([]); 
  }

  useEffect(()=>{ if(!loading) pick3(); }, [loading]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={pick3} className="px-3 py-2 rounded bg-black text-white">Ещё 3</button>
        <button onClick={()=>window.print()} className="px-3 py-2 rounded border">Распечатать</button>
        <button onClick={reset} className="px-3 py-2 rounded border">Сброс</button>
      </div>

      {pool.length===0 && <p className="text-sm text-gray-600">Пусто по фильтрам. Попробуйте убрать часть условий (например, материалы или возраст).</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {picked.map(g=>(
          <article key={g.id} className="rounded border p-4">
            <h3 className="font-semibold">{g.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{g.summary}</p>
            <div className="mt-2 text-xs text-gray-500">
              Место: {g.place} • Возраст: {g.ages.min}-{g.ages.max} • Время: {g.duration}
            </div>
            <a href={`/games/${g.slug}`} className="inline-block mt-3 text-blue-600 underline">Пошагово</a>
          </article>
        ))}
      </div>
    </div>
  );
}

'use client';
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

type Game = {
  id:string; slug:string; title:string; place:string;
  ages:{min:number,max:number}; duration:string; summary:string;
  materials:string[]; skills:string[]; noise:'low'|'medium'|'high';
};

export default function GamesPage() {
  const [all, setAll] = useState<Game[]>([]);
  const [q, setQ] = useState("");

  useEffect(()=>{ fetch("/data/games.json").then(r=>r.json()).then(setAll); }, []);
  const fuse = useMemo(()=> new Fuse(all,{ keys:["title","summary","materials","skills"], threshold:0.35 }), [all]);
  const list = q ? fuse.search(q).map(x=>x.item) : all;

  return (
    <div className="space-y-4">
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Поиск по названию/материалам/навыкам" className="w-full border rounded px-3 py-2"/>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(g=>(
          <a key={g.id} href={`/games/${g.slug}`} className="rounded border p-4 hover:bg-gray-50">
            <h3 className="font-semibold">{g.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{g.summary}</p>
            <div className="mt-2 text-xs text-gray-500">
              {g.place} • {g.duration} • {g.ages.min}-{g.ages.max}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

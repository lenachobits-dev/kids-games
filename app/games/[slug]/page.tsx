import data from "@/data/games.json";
import Link from "next/link";

export async function generateStaticParams() {
  return (data as any[]).map(g=>({ slug: g.slug }));
}

export default function GamePage({ params }: { params:{slug:string} }) {
  const g = (data as any[]).find(x=>x.slug===params.slug);
  if(!g) return <div>Not found</div>;
  const similar = (data as any[]).filter(x => x.slug!==g.slug && (x.place===g.place || x.materials?.some((m:string)=>g.materials?.includes(m)))).slice(0,3);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{g.title}</h1>
      <div className="text-sm text-gray-600">{g.summary}</div>
      <div className="text-xs text-gray-500">Место: {g.place} • Возраст: {g.ages.min}-{g.ages.max} • Время: {g.duration} • Шум: {g.noise}</div>
      <section>
        <h2 className="font-semibold mb-2">Шаги</h2>
        <ol className="list-decimal pl-5 space-y-1">
          {g.steps?.map((s:string,i:number)=>(<li key={i}>{s}</li>))}
        </ol>
      </section>
      {g.variations?.length>0 && (
        <section>
          <h2 className="font-semibold mb-2">Вариации</h2>
          <ul className="list-disc pl-5 space-y-1">{g.variations.map((v:string,i:number)=>(<li key={i}>{v}</li>))}</ul>
        </section>
      )}
      <div className="flex gap-2">
        <button onClick={()=>window.print()} className="px-3 py-2 rounded border">Распечатать</button>
        <Link href="/generator" className="px-3 py-2 rounded border">Открыть генератор</Link>
      </div>
      {similar.length>0 && (
        <section>
          <h2 className="font-semibold mb-2">Похожие</h2>
          <div className="flex flex-col gap-2">
            {similar.map((s:any)=>(<Link key={s.id} href={`/games/${s.slug}`} className="underline">{s.title}</Link>))}
          </div>
        </section>
      )}
    </div>
  );
}

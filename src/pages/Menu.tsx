import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ALCOHOL_FREE_BEER,
  CANS_NOTE,
  COCKTAILS,
  COCKTAIL_DEAL,
  DRAUGHT,
  FOOD_NOTES,
  FOOD_SECTIONS,
  HOT_DRINKS,
  MEAD,
  MOCKTAILS,
  PIZZAS,
  PIZZA_INTRO,
  SOFT_DRINKS,
  SPIRITS,
  TABLE_FEE,
  WINE,
  type Diet,
  type MenuItem,
  type Pizza,
  type Pour,
} from '../data/otterChaos';
import { menuPrice, money } from '../lib/fees';
import { Suit, SUIT_CHAR } from '../components/Suit';
import { Photo } from '../components/Photo';
import { ScrabbleWord } from '../components/ScrabbleWord';
import { useOpenStatus } from '../components/StatusPill';
import './Menu.css';

const TABS = [
  { id: 'pizza', label: 'Pizza' },
  { id: 'plates', label: 'Plates & sides' },
  { id: 'cocktails', label: 'Cocktails' },
  { id: 'mocktails', label: 'Mocktails' },
  { id: 'beer', label: 'Beer & cider' },
  { id: 'wine', label: 'Wine' },
  { id: 'mead', label: 'Mead & spirits' },
  { id: 'hot', label: 'Hot & soft' },
];

type Filter = 'all' | 'v' | 've';

function matches(diet: Diet | undefined, f: Filter) {
  if (f === 'all') return true;
  if (f === 'v') return diet === 'v' || diet === 've' || diet === 'v/ve';
  return diet === 've' || diet === 'v/ve';
}

function PizzaRow({ p }: { p: Pizza }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="mrow">
      <div className="mrow__top">
        <h3 className="mrow__name">
          {p.name}
          {p.diet && <span className="diet">{p.diet}</span>}
        </h3>
        <span className="mrow__dots" aria-hidden="true" />
        <span className="price">{menuPrice(p.price)}</span>
      </div>
      <p className="mrow__desc">{p.desc}</p>
      {p.game && (
        <button className="namedafter" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="g" initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} exit={{ rotateX: 90, opacity: 0 }} transition={{ duration: 0.22 }}>
                Named after <strong>{p.game}</strong>
                {p.onShelf ? ', and it’s on our shelves' : ''}
              </motion.span>
            ) : (
              <motion.span key="q" initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} exit={{ rotateX: 90, opacity: 0 }} transition={{ duration: 0.22 }}>
                Named after…?
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      )}
    </li>
  );
}

function Rows({ items }: { items: MenuItem[] }) {
  return (
    <ul className="mlist">
      {items.map((i) => (
        <li key={i.name} className="mrow">
          <div className="mrow__top">
            <h3 className="mrow__name">
              {i.name}
              {i.diet && <span className="diet">{i.diet}</span>}
            </h3>
            <span className="mrow__dots" aria-hidden="true" />
            {i.price !== undefined && <span className="price">{menuPrice(i.price)}</span>}
          </div>
          {i.desc && <p className="mrow__desc">{i.desc}</p>}
        </li>
      ))}
    </ul>
  );
}

function Notes({ notes }: { notes: string[] }) {
  return (
    <p className="pour__notes">
      {notes.map((n, i) => (
        <span key={n}>
          {i > 0 && <span className="pour__heart" aria-hidden="true">♥</span>}
          {n}
        </span>
      ))}
    </p>
  );
}

function PourTable({ sizes, items }: { sizes: string[]; items: Pour[] }) {
  return (
    <table className="pours">
      <thead>
        <tr>
          <th scope="col">
            <span className="sr-only">Drink</span>
          </th>
          {sizes.map((s) => (
            <th scope="col" key={s}>
              {s}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((d) => (
          <tr key={d.name}>
            <th scope="row">
              <span className="pour__name">
                {d.name} <Suit kind={d.suit} size={14} title={SUIT_CHAR[d.suit]} />
                <span className="pour__origin">{d.origin}</span>
              </span>
              <Notes notes={d.notes} />
            </th>
            {sizes.map((s, i) => (
              <td key={s} className="price">
                {menuPrice(d.prices[i])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Menu() {
  const [filter, setFilter] = useState<Filter>('all');
  const [active, setActive] = useState('pizza');
  const { kitchen, kitchenText } = useOpenStatus();
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = TABS.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const btn = tabsRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    btn?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [active]);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const pizzas = PIZZAS.filter((p) => matches(p.diet, filter));

  return (
    <div className="page menu">
      <div className="wrap">
        <header className="page-head menu__head">
          <p className="kicker kicker--pink">Food &amp; drink · tap the tiles</p>
          <ScrabbleWord word="Menu" as="h1" size="lg" />
          <p className="menu__lead">Pizza in one hand, dice in the other.</p>
          <p>
            Handmade sourdough pizzas with vegan options and gluten-free bases on request, and a wide range of soft and alcoholic drinks,
            including a wide range of cocktails.
          </p>
          <p className={`menu__kitchen ${kitchen.open ? 'is-open' : ''}`}>{kitchenText}</p>
        </header>
      </div>

      <div className="mtabs" ref={tabsRef}>
        <div className="mtabs__in">
          {TABS.map((t) => (
            <button key={t.id} data-id={t.id} className={active === t.id ? 'is-active' : ''} onClick={() => jump(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="wrap menu__body">
        <div className="menu__main">
          <section id="pizza" className="msec">
            <div className="msec__head">
              <ScrabbleWord word="Pizza" />
              <div className="mfilter" role="group" aria-label="Filter food">
                {(
                  [
                    ['all', 'Everything'],
                    ['v', 'Veggie'],
                    ['ve', 'Vegan'],
                  ] as [Filter, string][]
                ).map(([f, l]) => (
                  <button key={f} className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            {PIZZA_INTRO.map((l) => (
              <p key={l} className="msec__intro">
                {l}
              </p>
            ))}
            <ul className="mlist">
              {pizzas.map((p) => (
                <PizzaRow key={p.name} p={p} />
              ))}
            </ul>
          </section>

          <section id="plates" className="msec">
            {FOOD_SECTIONS.map((sec) => {
              const items = sec.items.filter((i) => matches(i.diet, filter));
              if (!items.length) return null;
              return (
                <div key={sec.title} className="msub">
                  <ScrabbleWord word={sec.title} size="sm" />
                  <Rows items={items} />
                </div>
              );
            })}
            <div className="mnotes">
              {FOOD_NOTES.map((n) => (
                <p key={n}>{n}</p>
              ))}
            </div>
          </section>

          <figure className="mphoto mphoto--wide">
            <Photo k="bar-night" alt="The bar: spirits on pipe shelving, a cake dome of brownies, fridges of cans and the orange-painted arch above" sizes="(min-width: 1000px) 700px, 100vw" />
          </figure>

          <section id="cocktails" className="msec">
            <ScrabbleWord word="Cocktails" size="sm" />
            <div className="deal-banner">
              <p>
                One for <strong>{money(COCKTAIL_DEAL.one)}</strong>
              </p>
              <p>
                Two of the same for <strong>{money(COCKTAIL_DEAL.twoSame)}</strong>
              </p>
            </div>
            <ul className="cocktails">
              {COCKTAILS.map((c) => (
                <li key={c.name}>
                  <h3>{c.name}</h3>
                  <p>{c.desc}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="mocktails" className="msec">
            <ScrabbleWord word="Mocktails" size="sm" />
            <Rows items={MOCKTAILS} />
          </section>

          <section id="beer" className="msec">
            <ScrabbleWord word="Beer" size="sm" />
            <p className="msec__name">Craft beer &amp; cider</p>
            <h3 className="msec__sub">Draught</h3>
            <PourTable sizes={DRAUGHT.sizes} items={DRAUGHT.items} />
            <div className="cans">
              <h3>{CANS_NOTE.title}</h3>
              <p>{CANS_NOTE.body}</p>
            </div>
            <h3 className="msec__sub">Alcohol-free beer</h3>
            <PourTable sizes={['330ml']} items={[ALCOHOL_FREE_BEER]} />
          </section>

          <section id="wine" className="msec">
            <ScrabbleWord word="Wine" size="sm" />
            <p className="suits-key">
              <span>
                <Suit kind="club" size={14} /> white
              </span>
              <span>
                <Suit kind="diamond" size={14} /> red
              </span>
              <span>
                <Suit kind="heart" size={14} /> rosé
              </span>
              <span>
                <Suit kind="spade" size={14} /> sparkling
              </span>
            </p>
            {WINE.groups.map((g) => (
              <div key={g.title} className="msub">
                <h3 className="msec__sub">{g.title}</h3>
                <PourTable sizes={WINE.sizes} items={g.items} />
              </div>
            ))}
            <p className="mnotes">{WINE.note}</p>
          </section>

          <section id="mead" className="msec">
            <ScrabbleWord word="Mead" size="sm" />
            <p className="msec__intro">{MEAD.intro}</p>
            <table className="pours">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Mead</span>
                  </th>
                  {MEAD.sizes.map((s) => (
                    <th scope="col" key={s}>
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MEAD.items.map((m) => (
                  <tr key={m.name}>
                    <th scope="row">
                      <span className="pour__name">
                        {m.name} <Suit kind={m.suit} size={14} />
                        <span className="pour__origin">{m.origin}</span>
                      </span>
                      <p className="mrow__desc">{m.desc}</p>
                    </th>
                    {m.prices.map((p, i) => (
                      <td key={i} className="price">
                        {menuPrice(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="msub">
              <ScrabbleWord word="Spirits" size="sm" />
              <p className="note">Single / Double</p>
              <Rows items={SPIRITS} />
            </div>
          </section>

          <section id="hot" className="msec msec--two">
            <div>
              <ScrabbleWord word="Hot" size="sm" />
              <p className="msec__name">Hot drinks</p>
              <Rows items={HOT_DRINKS} />
            </div>
            <div>
              <ScrabbleWord word="Soft" size="sm" />
              <p className="msec__name">Soft drinks</p>
              <Rows items={SOFT_DRINKS} />
            </div>
          </section>

          <p className="mnotes menu__fineprint">{TABLE_FEE.noServiceCharge} Prices in pounds.</p>
        </div>

        <aside className="menu__side" aria-hidden="true">
          <Photo k="cocktail-hand" alt="" sizes="320px" />
          <Photo k="pint-otter" alt="" sizes="320px" />
          <Photo k="hot-choc" alt="" sizes="320px" />
          <Photo k="pour" alt="" sizes="320px" />
        </aside>
      </div>
    </div>
  );
}

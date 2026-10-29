import { useMemo, useState } from "react";

const initialItems = [
  { id: 1, title: "Личный кабинет", category: "Интерфейс", description: "Страница пользователя с основной информацией и быстрым доступом к функциям.", color: "bg-blue-100 text-blue-700", icon: "👤" },
  { id: 2, title: "Каталог записей", category: "Данные", description: "Список объектов, который удобно просматривать на телефоне, планшете и компьютере.", color: "bg-violet-100 text-violet-700", icon: "🗂️" },
  { id: 3, title: "Форма обратной связи", category: "Формы", description: "Поля ввода с понятными подписями и заметной кнопкой отправки.", color: "bg-emerald-100 text-emerald-700", icon: "✉️" }
];

function App() {
  const [items, setItems] = useState(initialItems);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notice, setNotice] = useState("");

  const canSubmit = useMemo(
    () => title.trim().length > 0 && description.trim().length > 0,
    [title, description]
  );

  function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      category: "Новая запись",
      description: description.trim(),
      color: "bg-amber-100 text-amber-800",
      icon: "✨"
    };

    setItems((current) => [newItem, ...current]);
    setTitle("");
    setDescription("");
    setNotice("Запись добавлена на страницу.");
    window.setTimeout(() => setNotice(""), 3000);
  }

  return (
    <div className="min-h-screen text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">КТ</span>
            <span>
              <span className="block text-base font-bold tracking-tight text-slate-900">Практикум Frontend</span>
              <span className="block text-xs text-slate-500">КТ 3 · Tailwind CSS</span>
            </span>
          </a>
          <nav aria-label="Основная навигация" className="flex flex-wrap items-center gap-2 text-sm font-medium sm:gap-5">
            <a href="#cards" className="rounded-md px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-blue-700">Карточки</a>
            <a href="#form" className="rounded-md px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-blue-700">Добавить запись</a>
            <a href="#about" className="rounded-md bg-blue-50 px-3 py-2 text-blue-700 transition hover:bg-blue-100">О проекте</a>
          </nav>
        </div>
      </header>

      <main id="home" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-6 py-8 text-white shadow-lg sm:px-10 sm:py-10">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-50">Демо-задание · 40 минут</p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Адаптивный интерфейс</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-50 sm:text-base sm:leading-7">
              Пример оформления Fullstack-интерфейса с помощью Tailwind CSS: адаптивная сетка карточек, понятная форма и навигация для разных экранов.
            </p>
            <a href="#cards" className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700">
              Посмотреть карточки <span className="ml-2" aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section id="cards" className="scroll-mt-6">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-blue-700">Раздел 01</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Список записей</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Сетка автоматически меняет число колонок в зависимости от ширины экрана.</p>
            </div>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600">{items.length} записи</span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article key={item.id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-2xl" aria-hidden="true">{item.icon}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.color}`}>{item.category}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{item.description}</p>
                <div className="mt-5 border-t border-slate-100 pt-4 text-xs font-medium text-slate-400">Карточка #{item.id === 1 || item.id === 2 || item.id === 3 ? item.id : "новая"}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="form" className="mt-12 scroll-mt-6">
          <div className="mb-5">
            <p className="text-sm font-semibold text-blue-700">Раздел 02</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Добавить запись</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Заполните оба поля. Новая карточка появится в списке выше.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:col-span-3">
              <div className="space-y-5">
                <div>
                  <label htmlFor="title" className="mb-2 block text-sm font-semibold text-slate-700">Название записи <span className="text-red-500">*</span></label>
                  <input id="title" name="title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Например, Мой профиль" required maxLength={60} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                </div>
                <div>
                  <label htmlFor="description" className="mb-2 block text-sm font-semibold text-slate-700">Описание <span className="text-red-500">*</span></label>
                  <textarea id="description" name="description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Кратко опишите запись..." required rows="4" maxLength={240} className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                  <p className="mt-1.5 text-right text-xs text-slate-400">{description.length}/240</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button type="submit" disabled={!canSubmit} className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none">
                    Добавить запись
                  </button>
                  <button type="button" onClick={() => { setTitle(""); setDescription(""); setNotice(""); }} className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100">
                    Очистить
                  </button>
                </div>
                {notice && <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{notice}</p>}
              </div>
            </form>

            <aside className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-7 lg:col-span-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl shadow-sm" aria-hidden="true">💡</div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Что проверить</h3>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
                <li className="flex gap-2"><span className="font-bold text-blue-600">✓</span><span>На телефоне карточки идут в одну колонку.</span></li>
                <li className="flex gap-2"><span className="font-bold text-blue-600">✓</span><span>На планшете — минимум две колонки.</span></li>
                <li className="flex gap-2"><span className="font-bold text-blue-600">✓</span><span>На компьютере — три колонки.</span></li>
                <li className="flex gap-2"><span className="font-bold text-blue-600">✓</span><span>Кнопка меняет цвет при наведении и отключена, пока поля пустые.</span></li>
              </ul>
            </aside>
          </div>
        </section>

        <section id="about" className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <p className="text-sm font-semibold text-blue-700">Раздел 03</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">О проекте</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Учебный пример выполнен на React и Tailwind CSS. Стили находятся прямо в JSX-разметке в виде классов Tailwind. Данные добавляются только в состояние страницы и не сохраняются на сервере.
          </p>
        </section>

        <footer className="py-8 text-center text-xs text-slate-400">
          КТ 3 · Подготовка к демо-экзамену (Frontend)
        </footer>
      </main>
    </div>
  );
}

export default App;
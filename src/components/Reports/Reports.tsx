import "./Reports.css";


const reports = [
  { id: 1, title: "Заголовок", date: "01.01.2026" },
  { id: 2, title: "Заголовок", date: "01.01.2026" },
  { id: 3, title: "Заголовок", date: "01.01.2026" },
];

export function Reports() {
  return (
    <main className="reports-page">
      <section className="reports">
        <div className="reports__header">Мои отчёты</div>

        <div className="reports__list">
          {reports.map((report) => (
            <article key={report.id} className="reports__card">
              <div className="reports__content">
                <h2 className="reports__title">{report.title}</h2>
                <p className="reports__date">Дата выполнения: {report.date}</p>
              </div>

              <button type="button" className="reports__button">
                Открыть отчёт
              </button>
            </article>
          ))}
        </div>

       <div className="reports__footer">
          <button type="button" className="reports__add" aria-label="Добавить отчёт">
            +
          </button>
        </div>
      </section>
    </main>     
  );
}

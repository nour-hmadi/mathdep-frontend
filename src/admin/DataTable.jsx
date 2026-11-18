import React, { useState } from "react";

// The table every dashboard tab uses: a search box, filters, sorting by clicking a column title,
// and a count of the rows shown. Each tab only describes its columns, filters and buttons:
//   columns: [{ key, label, value(row), text(row), render(row), sortable }]
//     value() is what sorting uses, text() what the search looks in (both default to row[key])
//   filters: [{ key, label, options: [[value, label], ...], match(row, value) }]
//   rowClass(row): an optional class for a row, e.g. to highlight rows that need attention
const valueOf = (column, row) => (column.value ? column.value(row) : row[column.key]);
const textOf = (column, row) => (column.text ? column.text(row) : valueOf(column, row));

const compare = (a, b) => {
  if (a === undefined || a === null || a === "") return 1;   // empty cells go last
  if (b === undefined || b === null || b === "") return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
};

function DataTable({ rows, columns, filters = [], actions, toolbar, rowClass, searchPlaceholder = "Search…", empty = "Nothing here yet." }) {
  const [query, setQuery] = useState("");
  const [chosen, setChosen] = useState({});                       // filter key -> chosen value ("" means all)
  const [sort, setSort] = useState({ key: null, direction: 1 });   // 1 = A to Z, -1 = Z to A

  const words = query.trim().toLowerCase();
  let shown = rows.filter((row) =>
    filters.every((filter) => !chosen[filter.key] || filter.match(row, chosen[filter.key])) &&
    (!words || columns.some((column) => String(textOf(column, row) ?? "").toLowerCase().includes(words))));
  if (sort.key) {
    const column = columns.find((item) => item.key === sort.key);
    shown = [...shown].sort((a, b) => compare(valueOf(column, a), valueOf(column, b)) * sort.direction);
  }

  const sortBy = (key) => setSort((current) => ({ key, direction: current.key === key ? -current.direction : 1 }));
  const arrow = (key) => (sort.key !== key ? "↕" : sort.direction === 1 ? "▲" : "▼");

  return (
    <div className="data-table">
      <div className="data-table__tools">
        <input type="search" className="data-table__search" placeholder={searchPlaceholder} aria-label="Search"
               value={query} onChange={(event) => setQuery(event.target.value)} />
        {filters.map((filter) => (
          <select key={filter.key} aria-label={filter.label} value={chosen[filter.key] || ""}
                  onChange={(event) => setChosen({ ...chosen, [filter.key]: event.target.value })}>
            <option value="">{filter.label}: all</option>
            {filter.options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        ))}
        <span className="data-table__count">{shown.length} of {rows.length}</span>
        {toolbar}
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}
                    aria-sort={sort.key === column.key ? (sort.direction === 1 ? "ascending" : "descending") : "none"}>
                  {column.sortable === false ? column.label : (
                    <button type="button" className="data-table__sort" onClick={() => sortBy(column.key)}>
                      {column.label} <span aria-hidden="true">{arrow(column.key)}</span>
                    </button>
                  )}
                </th>
              ))}
              {actions && <th><span className="sr-only">Actions</span></th>}
            </tr>
          </thead>
          <tbody>
            {shown.length ? shown.map((row) => (
              <tr key={row._id} className={rowClass ? rowClass(row) : undefined}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render ? column.render(row) : textOf(column, row)}</td>
                ))}
                {actions && <td className="data-table__actions">{actions(row)}</td>}
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="data-table__empty">
                  {rows.length ? "Nothing matches. Change the search or the filters." : empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;

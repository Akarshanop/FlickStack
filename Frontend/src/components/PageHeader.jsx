import PropTypes from "prop-types";
import "../Style/PageHeader.css";

export default function PageHeader({
  title,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  addLabel,
  onAdd,
}) {
  return (
    <header className="page-header">
      <h1 className="page-header__title">{title}</h1>

      <input
        type="text"
        className="page-header__search"
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <button className="page-header__add" onClick={onAdd}>
        ➕ {addLabel}
      </button>
    </header>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  addLabel: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export function SearchBar({ value, onChange, placeholder = "Cerca..." }) {
    return (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid #e5e7eb"
        }}
      />
    );
  }
  
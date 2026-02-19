export function Card({ children }) {
    return (
      <div style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        background: "white",
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)"
      }}>
        {children}
      </div>
    );
  }
  
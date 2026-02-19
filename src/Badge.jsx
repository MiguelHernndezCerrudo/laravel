export default function Badge({ children }) {
    return (
      <span
        style={{
          display: "inline-block",
          padding: "6px 12px",
          borderRadius: 999,
          background: "#e0e7ff", 
          color: "#1e3a8a",        
          fontSize: 13,
          fontWeight: 600
        }}
      >
        {children}
      </span>
    );
  }
  
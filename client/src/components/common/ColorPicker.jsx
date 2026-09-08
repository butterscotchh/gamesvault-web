const ColorPicker = ({ colors, selectedColor, onColorChange }) => {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '12px',
      justifyContent: 'center'
    }}>
      <span style={{
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '8px',
        letterSpacing: '0.15em',
        color: '#585046',
        marginRight: '8px',
      }}>
        PILIH WARNA
      </span>
      {colors.map((color) => (
        <div
          key={color.value}
          onClick={() => onColorChange(color.value)}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: color.value,
            border: selectedColor === color.value 
              ? '2px solid #040405' 
              : '2px solid #bfbaa7',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            transform: selectedColor === color.value ? 'scale(1.15)' : 'scale(1)',
            boxShadow: selectedColor === color.value 
              ? '0 0 0 3px #e6e1d1, 0 0 0 4px #040405' 
              : 'none',
            outline: 'none',
          }}
          title={color.name}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
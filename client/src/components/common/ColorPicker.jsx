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
        fontSize: '14px',
        fontWeight: '500',
        color: '#374151',
        marginRight: '8px'
      }}>
        Pilih Warna:
      </span>
      {colors.map((color) => (
        <div
          key={color.value}
          onClick={() => onColorChange(color.value)}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: color.value,
            border: selectedColor === color.value 
              ? '3px solid #9e6b54' 
              : '2px solid #d1d5db',
            cursor: 'pointer',
            transition: 'all 0.2s',
            transform: selectedColor === color.value ? 'scale(1.1)' : 'scale(1)',
            boxShadow: selectedColor === color.value 
              ? '0 0 0 3px #fdf8f6, 0 0 0 5px #9e6b54' 
              : 'none'
          }}
          title={color.name}
        />
      ))}
    </div>
  );
};

export default ColorPicker;

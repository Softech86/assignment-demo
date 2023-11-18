// Props
// - selection: Selection[]
//   - Selection: { startPos, endPos, id, isSelected }
// 根据selection渲染列表

const TextBox = ({selection, children, onSelectionChange, onSelectionCreate}) => {
    const handleItemClick = (index, isSelected) => {
        onSelectionChange(index, isSelected);
    };

    return [
        (selection || []).map((item, index) => {
            return (
                // 上下m-8，左右m-0
                <div className="mt-8 mb-8 ml-0 mr-0" id={item.id}>
                    <div
                        style={{
                            opacity: item.isSelected ? 1 : 0.5,
                        }}
                    >{children(item, index)}</div>

                    <div
                        onClick={() => handleItemClick(index, !item.isSelected)}
                        className="inline-block"
                        style={{
                            backgroundColor: item.isSelected ? 'yellow' : 'white',
                        }}
                    >
                        <div>start: {item.startPos}</div>
                        <div>end: {item.endPos}</div>
                        <div>content: {item.text}</div>
                    </div>
                </div>
            )
        }),
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => onSelectionCreate(0, 10, 'Hello World')}
        >增加选区</button>
    ]
}

export default TextBox

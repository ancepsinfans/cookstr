import React from "react";

function TagInput({ tags, dispatch }) {
  const inputRef = React.useRef();
  const [t, setT] = React.useState('')

  const handleInputChange = (event) => {
    setT(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag(inputRef.current.value.trim());
      setT('')
    } else if (event.key === 'Backspace' && inputRef.current.value === '') {
      removeTag(tags.length - 1);
    }
  };

  const addTag = (tag) => {
    if (tag !== '' && !tags.includes(tag)) {
      dispatch({ type: 'ADD_TAG', payload: tag });
      inputRef.current.value = '';
    }
  };

  const removeTag = (index) => {
    if (index >= 0 && index < tags.length) {
      dispatch({ type: 'REMOVE_TAG', payload: tags[index] });
    }
  };

  return (
    <div>
      <label htmlFor="tag-input">Tags:</label>
      <div className="tag-input-container">
        {tags.map((tag, index) => (
          <div key={tag} className="tag">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              aria-label={`Remove ${tag} tag`}
            >
              ×
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          id="tag-input"
          type="text"
          value={t}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Type a tag and press Enter"
        />
      </div>
    </div>
  );
}


export default TagInput;

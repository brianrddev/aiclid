import React from 'react';

interface NameInputProps {
  name: string;
  onNameChange: (name: string) => void;
}

/**
 * Component for entering the player's name.
 */
const NameInput: React.FC<NameInputProps> = ({ name, onNameChange }) => {
  return (
    <div className="mb-6">
      <label
        htmlFor="playerName"
        className="mb-2 block text-lg font-semibold text-white"
      >
        Tu Nombre:
      </label>
      <input
        type="text"
        id="playerName"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Introduce tu nombre"
        className="w-full rounded border border-gray-600 bg-gray-800 p-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        maxLength={30} // Optional: limit name length
      />
    </div>
  );
};

export default NameInput;

import React from 'react'

const FormField = ({ labelName, type, name, placeholder, value, handleChange, isRandomPrompt, handleRandomPrompt }) => {
  return (
    <div className='flex flex-col mt-10 gap-1 text-sm font-medium'>
      <div className='flex gap-2 mb-1'>
        <label>{labelName}</label>
        {isRandomPrompt && (
          <button
            type='button'
            onClick={handleRandomPrompt}
            className='bg-gray-200 hover:bg-gray-100 px-2 text-xs rounded-lg hover:translate-x-2 transition-all duration-300 ease-out'
          >Random
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className='border-2 p-2 rounded-lg hover:border-blue-500 hover:translate-y-1 outline-none hover:drop-shadow-md transition-all ease-out duration-500' />
    </div>
  )
}

export default FormField
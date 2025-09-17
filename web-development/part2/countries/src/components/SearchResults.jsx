import React from 'react'

export const SearchResults = ({country, handleClickButtonShow, idCountry}) => {
  return (
    <div key={idCountry}>
      {country.name.common} <button onClick={
        () => handleClickButtonShow(country.name.common)
      }>{'Show'}</button>
    </div>
  )
}

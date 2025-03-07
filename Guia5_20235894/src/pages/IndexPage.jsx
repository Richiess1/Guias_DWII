import React from 'react'
import { useAppStore } from '../store/useAppStore'
import DrinkCard from '../components/DrinkCard'


export const IndexPage = () => {
  const drinks = useAppStore((state) => state.drinks)
  console.log(drinks);
  const hasDrinks = drinks.drinks?.length > 0
  console.log(drinks.drinks);
  return (
    <>
      <h1 className='text-4xl font-bold'>Recetas</h1>
      {hasDrinks?(
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 my-10 gap-10'>
          {drinks.drinks.map((drink)=>(
            <DrinkCard
                key={drink.idDrink}
                drink={drink}
            />
          ))}
        </div>
      ):(
        <p className='my-10 text-center text-2xl'>
            No hay resultados aun, ultiliza el formulario para buscar recetas
        </p>
      )}
    </>
  )
}

export function WatchedMoviesContainer({children}){
  return(
     <>
       {children}
     </>
   )
}

export function WatchedMoviesList({ watched, onDeleteMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDelete={() => onDeleteMovie(movie.imdbID)}
        />
      ))}
    </ul>
  );
}


export function WatchedMovie({ movie, onDelete }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      {/* Botón para eliminar */}
      <button onClick={onDelete} className="delete-btn">❌ Remove</button>
    </li>
  );
}



const average = (arr) =>
   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function WatchedSummary({watched}){
   const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
   const avgUserRating = average(watched.map((movie) => movie.userRating));
   const avgRuntime = average(watched.map((movie) => movie.runtime));

   return(
       <div className="summary">
         <h2>Movies you watched</h2>
         <div>
           <p>
             <span>#️⃣</span>
             <span>{watched.length} movies</span>
           </p>
           <p>
             <span>⭐️</span>
             <span>{avgImdbRating}</span>
           </p>
           <p>
             <span>🌟</span>
             <span>{avgUserRating}</span>
           </p>
           <p>
             <span>⏳</span>
             <span>{avgRuntime} min</span>
           </p>
         </div>
       </div>
   )
}

'use client'

export default function Home() {
  return (
    <form>
      <h1>Ingreso de quejas</h1>
      <p>Nombre:</p>
      <input type="text" id="name" placeholder="Plaza sucia"></input><br/>
      <p>Número de personas afectadas:</p>
      <input type="number" id="affected" placeholder="Número >= 1"></input><br/>
      <p>Categoría:</p>
      <select id="cat">
        <option value="maintenance">Mantención</option>
        <option value="security">Seguridad</option>
        <option value="cleaning">Limpieza</option>
        <option value="noise">Ruido</option>
        <option value="public_services">Servicios públicos</option>
        <option value="others">Otro</option>
      </select><br/>
      <p>Descripcion del problema:</p>
      <input id="desc" type="textarea" maxLength={5000} placeholder="Ej. Alcantarilla rota"></input><br/>
      <p>Fecha de ingreso de la queja:</p>
      <input type="date" id="date" placeholder="DD/MM/YYYY"></input><br/>
      <p>Estado inicial:</p>
      <select id="state">
        <option value="pending">Pendiente</option>
        <option value="in_progress">En progreso</option>
        <option value="completed">Completada</option>
      </select><br/>
      <button type="button" id="form_submit">Subir queja</button>
    </form>
  );
}
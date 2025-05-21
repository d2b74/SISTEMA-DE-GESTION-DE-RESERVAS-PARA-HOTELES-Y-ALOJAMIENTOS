// src/components/HomeHero.jsx
export function HomeHero() {
  return (
    <section id="home" className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/hotel-hero.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl font-bold mb-4">Bienvenido a DynaCord Hotel</h1>
        <p className="text-lg mb-6">Reserva tu estancia perfecta con un solo clic</p>
        <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700">Reserva Ahora</button>
      </div>
    </section>
  );
}
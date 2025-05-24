import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-200 via-white to-blue-200 p-4">
        <div className="text-center space-y-6 max-w-md mx-auto">
          <Image 
            src="/assets/images/logo-dora.png" 
            alt="DORA Festival" 
            width={300} 
            height={150} 
            priority
            className="mx-auto"
          />
          
          <h1 className="text-4xl font-bold text-gray-800 font-primary">
            Festival Dora
          </h1>
          
          <h2 className="text-2xl text-gray-700 font-secondary">
            Edición Groove
          </h2>
          
          <div className="grid grid-cols-1 gap-4 mt-8">
            <p className="text-xl font-bold">Sábado 26 Julio</p>
            <p className="text-xl font-bold">Vieja Usina</p>
            <p className="text-xl font-bold">Paraná ER</p>
          </div>
          
          <p className="text-3xl font-bold mt-12 text-orange-500">
            PRÓXIMAMENTE
          </p>
        </div>
      </main>
    </>
  );
}

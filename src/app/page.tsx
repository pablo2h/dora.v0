import Image from "next/image";
import Link from "next/link";
import Interlude from "@/components/Interlude";
import Tickets from "@/components/Tickets";
import CtaDiscount from "@/components/Formulario/CtaDiscount";
import LineUp from "@/components/LineUp/LineUp";
import IngresoLibre from "@/components/Tickets/IngresoLibre/IngresoLibre";
import ContentGrid from "@/components/ContentGrid/ContentGrid";
import AdBanner from "@/components/AdBanner/AdBanner";

export default function Home() {
  return (
    <>
      <main>
         <section className="hero">
          <div className="background-images"></div>
          
          {/* Decoración superior - solo visible en modo horizontal */}
          <div className="hero-decoration hero-decoration-top">
            <div className="flowers-row">
              <Image 
                src="/assets/images/Dora 1-2.svg" 
                alt="Flor decorativa" 
                className="flower-img" 
                width={100}
                height={100}
              />
              <Image 
                src="/assets/images/Dora 2-2.svg" 
                alt="Flor decorativa" 
                className="flower-img" 
                width={100}
                height={100}
              />
              <Image 
                src="/assets/images/Dora 3-2.svg" 
                alt="Flor decorativa" 
                className="flower-img" 
                width={100}
                height={100}
              />
            </div>
          </div>
          
          {/* Decoración izquierda - solo visible en modo horizontal */}
          <div className="hero-decoration hero-decoration-left">
            <div className="flowers-column">
              <Image 
                src="/assets/images/Dora 1-2.svg" 
                alt="Flor decorativa" 
                className="flower-img" 
                width={100}
                height={100}
              />
              <Image 
                src="/assets/images/Dora 2-2.svg" 
                alt="Flor decorativa" 
                className="flower-img" 
                width={100}
                height={100}
              />
              <Image 
                src="/assets/images/Dora 3-2.svg" 
                alt="Flor decorativa" 
                className="flower-img" 
                width={100}
                height={100}
              />
            </div>
          </div>
          
          {/* Contenido central - visible en ambos modos */}
          <div className="hero-content">
            <div className="content-grid">
              <div className="sponsor-logo">
                {/* Sponsor logo space */}
              </div>
              <p className="p-grid-home">Sabado 26 Julio</p>
              <div className="festival-logo">
                <Image 
                  src="/assets/images/LogoEdicionGroove-Horizontal.svg"
                  alt="DORA Festival"  
                  className="logo-main" 
                  width={400} 
                  height={200} 
                  priority
                /> 
              </div>
              <p className="p-grid-home">Vieja Usina, Paraná ER</p>
              <LineUp />
            </div>
          </div>
          
          {/* Decoración derecha - solo visible en modo horizontal */}
          <div className="hero-decoration hero-decoration-right">
            <div className="flowers-column">
              <Image 
                src="/assets/images/Dora 3-2.svg" 
                alt="Flor decorativa" 
                className="flower-img" 
                width={100}
                height={100}
              />
              <Image 
                src="/assets/images/Dora 2-2.svg" 
                alt="Flor decorativa" 
                className="flower-img" 
                width={100}
                height={100}
              />
              <Image 
                src="/assets/images/Dora 1-2.svg" 
                alt="Flor decorativa" 
                className="flower-img" 
                width={100}
                height={100}
              />
            </div>
          </div>
          
          {/* Decoración inferior - solo visible en modo horizontal */}
          <div className="hero-decoration hero-decoration-bottom">
            <div className="flowers-row">
              <Image 
                src="/assets/images/Dora 3-2.svg" 
                alt="Flor decorativa" 
                className="flower-img" 
                width={100}
                height={100}
              />
              <Image 
                src="/assets/images/Dora 2-2.svg" 
                alt="Flor decorativa" 
                className="flower-img" 
                width={100}
                height={100}
              />
              <Image 
                src="/assets/images/Dora 1-2.svg" 
                alt="Flor decorativa" 
                className="flower-img" 
                width={100}
                height={100}
              />
            </div>
          </div>
          
          <Link href="/entradas" className="tickets-button">Entradas</Link>
        </section>
        <Interlude />
        
        <section className="section-container">
          <ContentGrid 
            imageSrc="/assets/images/Dora 3.svg" 
            imageAlt="Ingreso libre Dora"
          >
            <IngresoLibre />
          </ContentGrid>
          
          <AdBanner />
          
          <ContentGrid 
            imageSrc="/assets/images/Dora 4.svg"
            imageAlt="Tickets Dora"
            imageOnRight={true}
          >
            <Tickets />
          </ContentGrid>
          
          <AdBanner />
          
          <ContentGrid 
            imageSrc="/assets/images/Dora 2.svg"
            imageAlt="Descuentos Dora"
          >
            <CtaDiscount />
          </ContentGrid>
          
          {/* Se ha eliminado la invocación al componente Sponsors */}
        </section>
        <Interlude />
      </main>
    </>
  );
}

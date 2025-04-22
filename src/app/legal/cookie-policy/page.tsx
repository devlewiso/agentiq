import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Link from "next/link";

export default function PoliticasDeCookies() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
            Política de Cookies
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Última actualización: 17 de abril de 2025
          </p>
        </div>

        <div className="prose prose-blue max-w-none dark:prose-invert">
          <p>
            Esta Política de Cookies explica cómo AgentIQ ("nosotros", "nuestro" o "nos") utiliza cookies y tecnologías similares para reconocerlo cuando visita nuestro sitio web y utiliza nuestros servicios. Explica qué son estas tecnologías y por qué las usamos, así como sus derechos para controlar nuestro uso de ellas.
          </p>

          <h2>Qué son las cookies</h2>
          <p>
            Las cookies son pequeños archivos de datos que se colocan en su ordenador o dispositivo móvil cuando visita un sitio web. Las cookies se utilizan ampliamente para permitir que los sitios web funcionen, o funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.
          </p>
          <p>
            Las cookies establecidas por el propietario del sitio web (en este caso, AgentIQ) se denominan "cookies propias". Las cookies establecidas por partes distintas del propietario del sitio web se denominan "cookies de terceros". Las cookies de terceros permiten que funciones o características de terceros se proporcionen en o a través del sitio web (como publicidad, contenido interactivo y análisis). Las partes que establecen estas cookies de terceros pueden reconocer su ordenador tanto cuando visita el sitio web en cuestión como cuando visita ciertos otros sitios web.
          </p>

          <h2>Por qué utilizamos cookies</h2>
          <p>
            Utilizamos cookies propias y de terceros por varias razones. Algunas cookies son necesarias por razones técnicas para que nuestro sitio web y servicios funcionen, y las denominamos cookies "esenciales" o "estrictamente necesarias". Otras cookies también nos permiten rastrear y dirigir los intereses de nuestros usuarios para mejorar la experiencia en nuestro sitio web y servicios. Los terceros sirven cookies a través de nuestro sitio web para publicidad, análisis y otras finalidades.
          </p>

          <h2>Tipos de cookies que utilizamos</h2>
          <p>
            Los tipos específicos de cookies propias y de terceros que servimos a través de nuestro sitio web y sus propósitos son los siguientes:
          </p>

          <h3>Cookies esenciales</h3>
          <p>
            Estas cookies son estrictamente necesarias para proporcionarle los servicios disponibles a través de nuestro sitio web y para utilizar algunas de sus características, como el acceso a áreas seguras. Dado que estas cookies son estrictamente necesarias para la entrega del sitio web, no puede rechazarlas sin afectar el funcionamiento de nuestro sitio.
          </p>
          <ul>
            <li><strong>_session_id:</strong> Utilizada para mantener el estado de la sesión del usuario.</li>
            <li><strong>XSRF-TOKEN:</strong> Utilizada para prevenir ataques de falsificación de solicitudes entre sitios.</li>
          </ul>

          <h3>Cookies de rendimiento y funcionalidad</h3>
          <p>
            Estas cookies se utilizan para mejorar el rendimiento y la funcionalidad de nuestro sitio web, pero no son esenciales para su uso. Sin embargo, sin estas cookies, ciertas funcionalidades pueden no estar disponibles.
          </p>
          <ul>
            <li><strong>_preferences:</strong> Utilizada para recordar las preferencias del usuario, como el idioma o la región.</li>
            <li><strong>_ui_settings:</strong> Utilizada para recordar la configuración de la interfaz de usuario, como el tema oscuro/claro.</li>
          </ul>

          <h3>Cookies analíticas y de personalización</h3>
          <p>
            Estas cookies recopilan información que se utiliza ya sea de forma agregada para ayudarnos a entender cómo se utiliza nuestro sitio web o qué tan efectivas son nuestras campañas de marketing, o para ayudarnos a personalizar nuestro sitio web para usted.
          </p>
          <ul>
            <li><strong>_ga, _gid:</strong> Cookies de Google Analytics utilizadas para distinguir usuarios y sesiones.</li>
            <li><strong>_hj*:</strong> Cookies de Hotjar utilizadas para análisis de comportamiento del usuario.</li>
          </ul>

          <h3>Cookies de marketing</h3>
          <p>
            Estas cookies se utilizan para hacer que los mensajes publicitarios sean más relevantes para usted. Realizan funciones como evitar que los mismos anuncios reaparezcan continuamente, asegurando que los anuncios se muestren correctamente y, en algunos casos, seleccionando anuncios que se basen en sus intereses.
          </p>
          <ul>
            <li><strong>_fbp:</strong> Utilizada por Facebook para entregar una serie de productos publicitarios.</li>
            <li><strong>_gcl_au:</strong> Utilizada por Google AdSense para experimentar con la eficiencia publicitaria.</li>
          </ul>

          <h2>Cómo puede controlar las cookies</h2>
          <p>
            Puede configurar o modificar los controles de su navegador web para aceptar o rechazar cookies. Si elige rechazar las cookies, aún puede utilizar nuestro sitio web aunque su acceso a algunas funcionalidades y áreas puede estar restringido. Como la forma en que rechaza las cookies varía de navegador a navegador, debe visitar el menú de ayuda de su navegador para obtener más información.
          </p>
          <p>
            Además, la mayoría de las redes publicitarias le ofrecen una forma de optar por no recibir publicidad dirigida. Si desea obtener más información, visite <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">http://www.aboutads.info/choices/</a> o <a href="http://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer">http://www.youronlinechoices.com</a>.
          </p>

          <h2>Cookies que hemos utilizado en los últimos 12 meses</h2>
          <p>
            A continuación se muestra una lista de las cookies que hemos utilizado en los últimos 12 meses. Intentamos mantener esta lista lo más actualizada posible, pero si nota que hay alguna discrepancia, no dude en contactarnos.
          </p>
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-0">Nombre</th>
                <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Proveedor</th>
                <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Propósito</th>
                <th className="py-3.5 pl-3 pr-4 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pr-0">Expiración</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-0">_session_id</td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 dark:text-gray-400">AgentIQ</td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 dark:text-gray-400">Esencial</td>
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm text-gray-500 dark:text-gray-400 sm:pr-0">Sesión</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-0">XSRF-TOKEN</td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 dark:text-gray-400">AgentIQ</td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 dark:text-gray-400">Esencial</td>
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm text-gray-500 dark:text-gray-400 sm:pr-0">Sesión</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-0">_preferences</td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 dark:text-gray-400">AgentIQ</td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 dark:text-gray-400">Funcionalidad</td>
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm text-gray-500 dark:text-gray-400 sm:pr-0">1 año</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-0">_ga</td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 dark:text-gray-400">Google</td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 dark:text-gray-400">Analítica</td>
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm text-gray-500 dark:text-gray-400 sm:pr-0">2 años</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-0">_fbp</td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 dark:text-gray-400">Facebook</td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 dark:text-gray-400">Marketing</td>
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm text-gray-500 dark:text-gray-400 sm:pr-0">3 meses</td>
              </tr>
            </tbody>
          </table>

          <h2>Cambios a esta Política de Cookies</h2>
          <p>
            Podemos actualizar esta Política de Cookies de vez en cuando para reflejar, por ejemplo, cambios en las cookies que utilizamos o por otras razones operativas, legales o regulatorias. Por lo tanto, revise regularmente esta Política de Cookies para mantenerse informado sobre nuestro uso de cookies y tecnologías relacionadas.
          </p>
          <p>
            La fecha en la parte superior de esta Política de Cookies indica cuándo se actualizó por última vez.
          </p>

          <h2>Contáctenos</h2>
          <p>
            Si tiene alguna pregunta sobre nuestro uso de cookies o esta Política de Cookies, contáctenos en:
          </p>
          <p>
            AgentIQ<br />
            Correo electrónico: privacy@agentiq.com<br />
            Dirección: Av. Insurgentes Sur 1602, Ciudad de México, México
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
import { Button, Text } from "@/components/isomorphic";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.story}>
      <div className={styles.content}>
        <div className={styles.content_bars} />
        <div className={styles.content_scroll}>
          <Text>
            Había una vez...
          </Text>
          {/* <Text>
            Macondo era entonces una aldea de veinte casas de barro y cañabrava construidas a la orilla de un río de aguas diáfanas que se precipitaban por un lecho de piedras pulidas, blancas y enormes como huevos prehistóricos. El mundo era tan reciente, que muchas cosas carecían de nombre, y para mencionarlas había que señalarías con el dedo. Todos los años, por el mes de marzo, una familia de gitanos desarrapados plantaba su carpa cerca de la aldea, y con un grande  alboroto de pitos y timbales daban a conocer los nuevos inventos. Primero llevaron el imán. Un gitano corpulento, de barba montaraz y manos de gorrión, que se presentó con el nombre de Melquíades, hizo una truculenta demostración pública de lo que él mismo llamaba la octava maravilla de los sabios alquimistas de Macedonia. Fue de casa en casa arrastrando dos lingotes metálicos, y todo el mundo se espantó al ver que los calderos, las pailas, las tenazas y los anafes se caían de su sitio, y las maderas crujían por la desesperación de los clavos y los tornillos tratando de desenclavarse, y aun los objetos perdidos desde hacía mucho tiempo aparecían por donde más se les había buscado, y se arrastraban en desbandada turbulenta detrás de los fierros mágicos de Melquíades.
          </Text> */}
        </div>
      </div>

      <div className={styles.ctas}>
        <Button variant="primary">Empezar</Button>
        {/* <Button variant="secondary">Atrás</Button>
        <Button variant="secondary">Continuar</Button> */}
      </div>
    </div>
  );
}

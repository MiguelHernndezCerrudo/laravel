import { Link } from "react-router-dom";
import { Card } from "../Card.jsx";

export default function Home() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Card>
        <h1 style={{ margin: 0 }}>Què és Laravel?</h1>
        <p style={{ color: "#374151" }}>
        Laravel és un framework de PHP i és utilitzat per desenvolupar aplicacions web.
        PHP és el llenguatge de programació més utilitzat al món per desenvolupar llocs web, aplicacions web i els populars CMS, com WordPress o Joomla.
        Laravel crea un entorn de treball i proporciona eines als desenvolupadors per ajudar-los a desenvolupar a PHP les seves aplicacions web.
        
        El que es busca amb Laravel és construir aplicacions sòlides i estables, que siguin fàcils de desenvolupar i la utilització de part del codi preprogramada, perquè pugui aprofitar-se i reutilitzar-se, evitant així la reescriptura del codi a la mateixa aplicació.
        Gràcies a això s'aconsegueixen aplicacions amb codi estable, senzill d'actualitzar i amb la possibilitat d'afegir noves funcionalitats sense necessitat de modificar el codi base, per mitjà d'un sistema de paquets modulars.
        Laravel és un sistema de codi obert, per la qual cosa no cal pagar per fer-lo servir.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link to="/guia" style={btn}>Explorar Guia</Link>
          <Link to="/receptes" style={btn}>Veure Receptes</Link>
          <Link to="/projectes" style={btn}>Projectes</Link>
        </div>
      </Card>

      <Card>
        <h2 style={{ marginTop: 0 }}>Què trobaràs aquí</h2>
        <ul style={{ margin: 0, color: "#374151" }}>
          <li><b>Guia</b> tipus documentació: temes clau i bones pràctiques.</li>
          <li><b>Manual</b>: receptes amb tags, passos i fragments de codi.</li>
          <li><b>Projectes tipus</b>: Exeples de projecte.</li>
          <li><b>Favorits</b>: Guarda temes i receptes per repassar-los després.</li>
        </ul>
      </Card>
    </div>
  );
}

const btn = {
  textDecoration: "none",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #111827",
  color: "#111827",
  fontWeight: 600
};

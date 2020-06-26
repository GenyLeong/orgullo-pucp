const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const Twit = require("twit");
require("dotenv").config();

const Bot = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

//stream = Bot.stream('statuses/mentions_timeline')

var sentences = [
"No es #OrgulloPUCP mantener a los JPs en un régimen de inestabilidad constante",
"No es #OrgulloPUCP desentenderse de los trabajadores tercerizados de seguridad y limpieza y dejarlos a merced de la suspensión perfecta",
"No es #OrgulloPUCP leer un articulo del rector intentado manchar la lucha estudiantil y ponernos contra los profesores cuando sus decisiones afectan a TODA LA COMUNIDAD",
"No es #OrgulloPUCP salir llorando de la Oficina de Apoyo Social por el maltrato de las asistentas sociales que te piden vender todo lo que tienes",
"No es #OrgulloPUCP tener miedo a denunciar a tu profesor porque forma parte de la argolla de tu facultad y es cercano a las autoridades",
"No es #OrgulloPUCP decir que tenemos el mejor campus del país mientras los estudiantes de la facultad de Artes Escénicas tienen clases en aulas prefabricadas o de asbesto",
"No es #OrgulloPUCP que ni siquiera nuestros representantes estudiantiles tengan acceso a las notas financieras de la universidad. NO SABEMOS EN QUÉ GASTAN LA PLATA QUE TIENEN Y QUIEREN QUE CONFIEMOS EN ELLOS",
"¿Cómo podemos cuidarnos desde casa si muchos de lo padres de los alumnos PUCP deben salir a la calle y arriesgarse al trabajar para conseguir dinero y poder pagar la boleta? Esto no es #OrgulloPUCP",
"No es #OrgulloPUCP si el rector manda datos recontra generales al correo de los estudiantes, pero no especifica ni transparenta en qué se gastan la plata. ¿Y así se preguntan por qué decimos que hay secretismo?",
"miles de familias viven con la soga al cuello, endeudados con los bancos, y con el riesgo de que si no pagan a tiempo les pueden embargar sus cosas.",
"he visto a alumnos independizarse (trabajar y estudiar a la vez) para solicitar una recategorización y así por lo menos la oficina de apoyo social les bajen la escala.",
"debo tener dos trabajos a medio tiempo y mis papás deben trabajar dos turnos completos.",
"mi hermano tuvo que cambiarse de colegio",
'He llorado un montón con esta frase "No te preocupes, tú estudia, nosotros sacaremos la plata de donde sea". Perdón que sea repetitiva, pero es que estoy segura de que a casi todos los estudiantes de cato alguna vez nuestros padres nos dijeron eso.',
"mi papá tiene 2 trabajos y hace taxi los domingos",
"mi familia está tratando de decirme que estudie otra carrera y en otra universidad. No me lo dicen de frente porque se sienten culpables de decirme qué estudiar. Yo me siento culpable de que mi educación cueste tanto.",
"tienes que estar en una escala injusta,pero tus padres te dicen:“No te preocupes hijo, haremos un esfuerzo para pagar. Termina la carrera lo más antes posible. Así la presión de la Universidad por pagar las boletas y la preocupación afectan tu salud mental",
"mi papá trabaja exponiéndose al COVID 19, porque no quiere que deje de estudiar, como le sucedió a él",
"mis abuelos juntaron de su pensión de jubilados durante un año. Era mi primera boleta y estuve cerca de perder mi vacante. Mi escala la calcularon en base a la capacidad de endeudamiento de mi papá. Hoy estamos hasta el cuello de préstamos.",
"le dijeron a mi tío que venda su carro. Él es taxista, el auto es su principal fuente de ingresos.",
"debo sentirme culpable por haber elegido está universidad",
"lloré de culpa por haber escogido una universidad que cada vez se hace más cara, y por no poder aplicar a una beca porque no estoy en las 2 últimas escalas.",
"Mi papá no duda ni una sola vez en exponer su salud con tal de no retrasarse con el pago de la boleta. Mi #OrgulloPUCP se acabó cuando tuve que ver a mis papás desvivirse por mi educación.",
"tuve que vivir semanas de depresión en las que vi a mi madre trabajando adolorida en una cama de hospital luego de una operación compleja porque, si no, no había manera de pagar más de 4000 soles mensuales a la universidad",
"no solo ves afectada tu economía sino tu salud mental. El pensar en que no podrás terminar tu carrera a tiempo, el que quizás tengas que dejar la universidad, ver el sufrimiento de tus padres, el invertir tus horas de estudio en trabajar duele y mucho.",
'"No te preocupes hijo, te amo y lo último que quiero es que dejes de estudiar, yo estaré siempre para ti. Aprovéchame hasta el último día de mi vida". ¿Y si mi viejito se muere? No sé que haría sin él. Gracias por todo el esfuerzo que haces por mí.',
'y estudiar en la "prestigiosa" universidad PUCP mi madre tuvo que presentar los papeles de divorcio y abandono y rogar a Dios para que no me pongan en una escala alta porque mi padre no cubría los gastos económicos de mi hermano y de mí.',
"mi mamá se prestaba dinero de mi abuela o sus amigas a fin de no pagar las moras ilegales. Luego decidió sacar una tarjeta de crédito y préstamos, términos endeudadas.",
"mi madre me dice: “Hijo, desde que ingresaste, nos ajustamos el estómago para pagar la universidad: no comemos bien. Desde que ingresaste, no me compro ropa nueva”.",
"mi papá ,un contador independiente, trabaja todos los días con un horario irregular para conseguir dinero y cancelar. Aún soy cachimba y estamos en una escala relativamente baja, no sé qué haremos si me suben de escala ya que estamos “mejor” #OrgulloPUCP",
"tuve que llevar menos cursos en cada ciclo. Hacer esto me ha retrasado un año. No hay #OrgulloPUCP",
"Compañerx, no te sientas culpable por haber escogido a esta universidad. No te sientas culpable por ver a tus padres romperse el lomo por tu educación. Los culpables son otros que reciben millones de soles y nadie sabe a dónde se va la plata!",
"Mi papá se queda hasta la madrugada haciendo CVs a pedido, luego de sus jornadas laborales de hasta 12 horas. Trabaja 16 horas o más al día y ni así podemos pagar la boleta.",
"fui mil veces a pedir recategorización porque mi papá se había quedado sin trabajo. Nunca me la dieron. Me endeudé.",
"he tenido que hacerle un pare a mi salud mental, pese a las constantes autolesiones, para que no sea un gasto más. Porque ojo, si vas por un tema psicológico fuera del académico te dicen “muchas gracias por abrirte, pero no podemos atenderte”",
"tuve que rogarle a una asistenta social que no me haga pagar casi 1000 soles de las moras ilegales.",
"sé que muchos de mis compañeros y sus familias se han visto obligados a pasar muchísimas penurias y también sé que esa plata de nuestras boletas se va en pagarle a encubridores, acosadores, corruptos, pedófilos y hasta feminicidas!",
"mi papá me pidió perdón por haberse demorado en pagar la boleta y busco de amigos para pagarla. Al final terminó endeudado.",
"es que Miles de alumnos vean a sus papás llorando porque la boleta ya es muy alta, es ver cómo con cada pago de la boleta las autoridades siguen lucrando con esto, esas mismas autoridades que ganan más de 40k soles, que ahorita nos están dando la espalda",
"mi hermano no podrá recibir las mismas oportunidades que yo",
"tuve que mudarme a la casa de mis abuelos y mis papás tuvieron que vender el carro porque no nos querían bajar de escala",
"Mi mamá tuvo que volver a sacar otro préstamo (esta endeudada por los juicios de alimentos y tenencia que tiene con mi papá). Llevo todos los papeles en los que se evidenciaba que mi papá no iba a contribuir con mi pensión, adivinen a quien no le creyeron.",
"mi papá tiene que desvelarse chambeando de taxista porque nunca nos alcanza, es no ver la hora de por fin ponerme a trabajar para ayudar en casa",
"Imposible no llorar tuve que ver a mis padres estresados y cada vez que salía una boleta. Me daba tristeza avisarles y miedo por el estrés que les generaba. Mi papá, quien es el sustento de la familia, hace un año que no trabaja, su empresa cerró.",
"ayer me fue muy difícil (emocionalmente hablando) tuitear esto, pero... mi papá, mientras tenía cáncer, fue a hablar con las asistentas sociales mostrándoles toda la info de la ÚLTIMA etapa en la que estaba, para que nos bajaran de escala.",
"Ya la vi, la nueva frase de las asistentas pucp: pero saqué su 25% de su AFP o no quiere que su hijo estudie en la mejor universidad del Perú. #OrgulloPUCP",
'creo que no hay nada que me dé más CÓLERA que los comentarios como "niñx, anda trabaja y estudia" o "yo a tu edad..."',
"tambien tenemos q tomar en cuenta q la pucp gasta mas en su sobrepoblacion de administrativos q en sus profesores",
"La PUCP tiene suficientes recursos económicos para poder brindarle mayores facilidades economicas a sus estudiantes. Lo que no tiene es humanismo. No hay #OrgulloPUCP",
"mi mamá tiene que exponerse al Covid-19 siendo una persona asmática, porque no quiere que me atrase en la carrera. Pero la universidad me ayuda devolviéndome 3 soles y cobrándome lo mismo que el año pasado.",
"@JulianaOxenford la invito a ver la página “Me lo dijo una asistenta PUCP” y a revisar el hashtag aquí en Twitter. Saludos.",
"mi mamá siempre ha tenido que trabajar desde las 6am hasta las 11pm, todos los días, sin descanso alguno. No hay domingos familiares. No hay navidad. No hay año nuevo. No hay días festivos.",
"tengo que escuchar a mis padres decir “tú no te preocupes, dedícate a estudiar, nosotros nos encargamos en pagar”",
"Hoy mi abuelo está muy mal de salud. No hay ingresos de los alquileres ni del restaurante. Hoy evaluó si retirarme del ciclo porque el dinero que usaría cubriría todo lo anterior.",
"Una asistenta social le dijo a mi mamá que no importaba si con su ingreso no podía cubrir luz, agua o alimentación de sus 4 hijos, con tal que le alcanzara era suficiente. ¿Así quieren que pidamos re-categorización en esta pandemia?",
"mi madre y mi padre tienen que ir al Hospital, atender pacientes Covid-19, tener turnos de 24 horas, tener ataques de estrés porque los hospitales están colapsando y no hay material con qué protegerse, no les toman las pruebas rápidas, terminan tosiendo",
"mi papá trabaja en tres trabajos distintos. Sufre de dolores crónicos debido a las tareas manuales que ejerce en su profesión y a pesar de todo el cansancio continúa buscando más horas para poder pagarme la carrera.",
"Mis padres han dejado de ahorrar de sus sueldos, no tenemos mucho dinero en caso de emergencias. Mi mamá en más de una ocasión se ha prestado de mis tíos para poder pagar puntual y no le cobren las moras que la PUCP cobraba."
];

app.use(express.static("/"));

/*function tweet(){
    var index= Math.floor(Math.random() * (sentences.length));
    var tweet = sentences[index]
    // return tweet ;

Bot.post('statuses/update', {status: tweet}, function(error, tweet, response) {
                        if (error) {
                            console.log("Error making post. ", error.message);
                        };
});
}

function random_from_array(arr){
    return arr[Math.floor(Math.random()*arr.length)]; 
}

console.log(tweet())*/

function random_from_array(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

app.all("/", function(request, response) {
  fs.readFile(__dirname + "/last_mention_id.txt", "utf8", function(
    err,
    last_mention_id
  ) {
    /* First, let's load the ID of the last tweet we responded to. */
    console.log("last_mention_id:", last_mention_id);

    Bot.get(
      "search/tweets",
      { q: "@orgullopucp -filter:retweets", since_id: last_mention_id },
      function(err, data, response) {
        if (err) {
          console.log("Error!", err);
          return false;
        }
        /* Next, let's search for Tweets that mention our bot, starting after the last mention we responded to. */
        if (data.statuses.length) {
          console.log(data.statuses);
          data.statuses.forEach(function(status) {
            console.log(status.id_str);
            console.log(status.text);
            console.log(status.user.screen_name);

            /* Now we can respond to each tweet. */
            Bot.post(
              "statuses/update",
              {
                possibly_sensitive: false,
                status:
                  "@" +
                  status.user.screen_name +
                  " #ParaPagarUnaBoletaPUCP " +
                  random_from_array(sentences),
                in_reply_to_status_id: status.id_str
              },
              function(err, data, response) {
                if (err) {
                  /* TODO: Proper error handling? */
                  console.log("Error!", err);
                } else {
                  fs.writeFile(
                    __dirname + "/last_mention_id.txt",
                    status.id_str,
                    function(err) {
                      /* TODO: Error handling? */
                      if (err) {
                        console.log("Error!", err);
                      }
                    }
                  );
                }
              }
            );
          });
        } else {
          /* No new mentions since the last time we checked. */
          console.log("No new mentions...");
        }
      }
    );
  });
  response.sendStatus(200);
});

var listener = app.listen(process.env.PORT, function() {
  console.log("Your bot is running on port " + listener.address().port);
});
